const filtersReducerDefaultState = {
  text: '',
  sortBy: 'createdAt',
}
const filterReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text }
    case 'SORT_BY_CREATED':
      return { ...state, sortBy: 'createdAt' }
    case 'SORT_BY_UPDATED':
      return { ...state, sortBy: 'createdAt' }

    default:
      return state
  }
}

export default filterReducer
