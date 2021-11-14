import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDeleteOutline } from 'react-icons/md'
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  updateTodo,
} from '../../redux/todo/todoActions'

const InputBar = ({ currentTab }) => {
  const dispatch = useDispatch()
  const [newTodo, setNewtodo] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()

    if (newTodo.trim().length > 1) {
      dispatch(createTodo(newTodo.trim()))
    }
  }
  if (currentTab !== 'completed') {
    return (
      <form className="input-form">
        <input
          type="text"
          onChange={({ target }) => setNewtodo(target.value)}
          value={newTodo}
          placeholder="add details"
        />
        <button type="submit" onClick={handleSubmit} className="">
          Add
        </button>
      </form>
    )
  }
  return null
}

const CheckBox = ({ td, currentTab }) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(td.status === 'active' ? false : true)

  const handleCheck = async () => {
    const status = check ? 'active' : 'completed'

    dispatch(updateTodo(td.id, { status }))

    setCheck(!check)
  }
  const handleText = async (e) => {
    const text = e.target.textContent
    if (text.length > 1) {
      dispatch(updateTodo(td.id, { text }))
    }
  }

  if (currentTab === 'all') {
    return (
      <span className="tab-item">
        <span className="input-box">
          <input type="checkbox" onChange={handleCheck} checked={check} />

          <label onKeyUp={handleText} contentEditable>
            {td.text}
          </label>
        </span>
      </span>
    )
  }
  if (currentTab === td.status) {
    return (
      <span className="tab-item">
        <span className="input-box">
          <input type="checkbox" onChange={handleCheck} checked={check} />

          <label
            className={`${td.status === 'completed' ? 'strike-thru' : ''}`}
            onKeyUp={handleText}
            contentEditable
          >
            {td.text}
          </label>
        </span>
        {td.status === 'completed' && (
          <button
            className="delete-button"
            onClick={() => {
              dispatch(deleteTodo(td.id))
            }}
          >
            <MdDeleteOutline />
          </button>
        )}
      </span>
    )
  }
  return null
}

function TabPanel({ currentTab }) {
  const dispatch = useDispatch()
  const todos = useSelector(({ todos, filters: { sortBy = 'createdAt' } }) => {
    if (todos.length === 0) return []
    return todos
      .filter((td) => {
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'updatedAt') {
          return a.updatedAt < b.updatedAt ? 1 : -1
        }
        return a.createdAt < b.createdAt ? 1 : -1
      })
  })

  return (
    <div className="tab-panel">
      <InputBar currentTab={currentTab} />
      <div className="tab-item-list">
        {todos.map((td) => (
          <CheckBox key={td.id} currentTab={currentTab} td={td} />
        ))}
      </div>
      <div className="tab-panel-delete">
        {currentTab === 'completed' && (
          <button
            onClick={() => {
              const deletedTodos = todos.filter(
                (td) => td.status === 'completed'
              )
              dispatch(deleteAllTodos(deletedTodos))
            }}
          >
            delete all
          </button>
        )}
      </div>
    </div>
  )
}

export default TabPanel
