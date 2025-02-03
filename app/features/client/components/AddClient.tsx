
import React, { useState } from 'react'
import { useClientContext } from '../context/ClientContext'
import { Button } from '~/components/ui/button';
import { Grid, List, PlusCircle } from 'lucide-react';
import { ClientForm } from './ClientForm';

const AddClient = () => {
    const {isOpen,setIsOpen,view,setView,selectedClient,setSelectedClient}=useClientContext();

    const handleCreate = () => {
        setIsOpen(true);
        setSelectedClient(null);
      }
    
  return (
    <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold">Clients</h1>
      <p className="text-gray-500">Manage your clients</p>
    </div>
    
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView('table')}
        className={view === 'table' ? 'text-primary bg-orange-400' : ''} 
      >
        <List className='dark:text-text' />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView('card')}
        className={view === 'card' ? 'text-primary bg-orange-400' : ''}
      >
        <Grid className='dark:text-text'/>
      </Button>
      <Button onClick={handleCreate} variant={'outline'} className='dark:text-text'
      >
        <PlusCircle/>
      </Button>
      {isOpen &&(
        <ClientForm selectedClient={selectedClient}/>
      )}
    </div>
  </div>
  )
}

export default AddClient
