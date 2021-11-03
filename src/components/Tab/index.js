import { useState } from 'react'
import TabList from './TabList'
import TabPanel from './TabPanel'

function Tab() {
  const [currentTab, setCurrentTab] = useState('All')
  console.log(currentTab)
  return (
    <>
      <TabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TabPanel />
    </>
  )
}

export default Tab
