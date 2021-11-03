import React from 'react'

const SearchBar = () => {
  return (
    <form className="search-form">
      <input type="text" placeholder="add details" />
      <button className="">Add</button>
    </form>
  )
}

function TabPanel() {
  return (
    <div className="tab-panel">
      <SearchBar />
      <div className="tab-item-list">
        <span>
          <input type="checkbox" />
          <label>coding chall</label>
        </span>
        <span>
          <input type="checkbox" />
          <label>coding chall</label>
        </span>
      </div>
    </div>
  )
}

export default TabPanel
