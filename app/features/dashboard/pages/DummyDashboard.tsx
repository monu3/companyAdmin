import React from 'react'
import { FinancialData } from '../dummyData/FinancialData'
import { RevenueTrend } from '../dummyData/RevenueTrend'
import { SalesData } from '../dummyData/SalesData'

const DummyDashboard = () => {
  return (
    <div className='px-4 flex flex-col gap-2'>
      <div>
        <h2 className='py-2'>Financial Details</h2>
        <div className='flex gap-8'>
          <FinancialData />
          <RevenueTrend />
        </div>
      </div>
      <div>
        <h2>Sales Details</h2>
        <SalesData />
      </div>
  
    </div>
  
  )
}

export default DummyDashboard
