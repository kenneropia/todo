function TabList({ setCurrentTab, currentTab }) {
  console.log(setCurrentTab)
  const allTabPanel = ['All', 'Completed', 'Active']
  const changeTab = (newTab) => {
    console.log(newTab)
    if (newTab !== 'All' && newTab !== 'Completed' && newTab !== 'Active')
      return
    if (newTab === currentTab) return
    console.log('lolol')
    setCurrentTab(newTab)
  }
  return (
    <ul className="tab-list">
      {allTabPanel.map((tab) => (
        <li className={`${currentTab === tab ? 'active-panel' : ''}`}>
          <button onClick={() => changeTab(tab)}>{tab}</button>
        </li>
      ))}
    </ul>
  )
}

export default TabList
