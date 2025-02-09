import React from 'react'
import { TaskRadialChart } from './TaskRadialChart'
import TaskLineChart from './TaskLineChart'

const TaskDetails = () => {
  return (
    <>
      <h2 className="py-2 text-lg lg:text-xl font-semibold">Task Details</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <TaskLineChart />
        <TaskRadialChart />
      </div>
    </>
  )
}

export default TaskDetails
