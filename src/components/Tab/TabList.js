function TabList({ setCurrentTab, currentTab }) {
  const allTabPanel = ['all', 'active', 'completed']

  const changeTab = (newTab) => {
    if (newTab !== 'all' && newTab !== 'completed' && newTab !== 'active')
      return
    if (newTab === currentTab) return

    setCurrentTab(newTab)
  }
  return (
    <ul className="tab-list">
      {allTabPanel.map((tab, id) => (
        <li key={id} className={`${currentTab === tab ? 'active-panel' : ''}`}>
          <button onClick={() => changeTab(tab)}>{tab}</button>
        </li>
      ))}
    </ul>
  )
}

export default TabList
