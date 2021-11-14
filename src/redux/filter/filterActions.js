export const setTextFilter = (text = '') => {
  return { type: 'SET_TEXT_FILTER', text }
}

export const sortByCreated = () => ({
  type: 'SORT_BY_CREATED',
})

export const sortByUpdated = () => ({
  type: 'SORT_BY_UPDATED',
})
