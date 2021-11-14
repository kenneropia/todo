import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodos } from '../../redux/todo/todoActions'
import Tab from '../Tab'

function Todo() {
  const dispatch = useDispatch()

  const user = useSelector(({ auth: { user } }) => user)
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch, user])
  return (
    <div className="todo">
      <header className="header-text">#todo</header>
      <Tab />
    </div>
  )
}

export default Todo
