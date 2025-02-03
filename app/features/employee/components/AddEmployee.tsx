import React from 'react'
import { useEmployeeContext } from '../context/EmployeeContext'
import { Button } from '~/components/ui/button';
import { Grid, List, PlusCircle } from 'lucide-react';
import { EmployeeForm } from './EmployeeForm';

const AddEmployee = () => {
    const { isOpen, setIsOpen, view, setView, selectedEmployee, setSelectedEmployee } = useEmployeeContext();
    const handleCreate = () => {
        setIsOpen(true);
        setSelectedEmployee(null);
      }
  return (
    <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold">Employees</h1>
      <p className="text-gray-500">Manage your employees</p>
    </div>
    
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView('table')}
        className={view === 'table' ? 'text-primary bg-orange-400' : ''} 
      >
        <List  className='dark:text-text' />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView('card')}
        className={view === 'card' ? 'text-primary bg-orange-400' : ''} 
      >
        <Grid  className='dark:text-text' />
      </Button>
      <Button onClick={handleCreate} variant={'outline'} className='dark:text-text'>
        <PlusCircle/>
      </Button>
      {isOpen &&(
        <EmployeeForm selectedEmployee={selectedEmployee}/>
      )}
    </div>
  </div>
  )
}

export default AddEmployee