import React from 'react'
import { useEmployeeContext } from '../context/EmployeeContext'
import NoEmployee from './NoEmployee';
import EmployeeCard from './EmployeeCard';
import EmployeeTable from './EmployeeTable';

const EmployeeDisplay = () => {
    const {view,employees}=useEmployeeContext();
  return (
    <div>
    {employees.length===0?(<NoEmployee/>):(
        <div>
            {view === "table"?<EmployeeTable/> :<EmployeeCard/>}
        </div>
    )

    }
    </div>
  );
}

export default EmployeeDisplay