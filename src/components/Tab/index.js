import { useState } from 'react'
import TabList from './TabList'
import TabPanel from './TabPanel'

function Tab() {
  const [currentTab, setCurrentTab] = useState('all')

  return (
    <>
      <TabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TabPanel currentTab={currentTab} />
    </>
  )
}

export default Tab
