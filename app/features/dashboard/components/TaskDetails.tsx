import React from 'react'
import { TaskRadialChart } from './TaskRadialChart'
import TaskLineChart from './TaskLineChart'

const TaskDetails = () => {
  return (
    <>
      <h2 className='py-2'>Task Details</h2>
      <div className='flex gap-4 lg:flex-row sm:flex-col'>
        <TaskLineChart />
        <TaskRadialChart />
      </div>
    </>
  
  )
}

export default TaskDetails
