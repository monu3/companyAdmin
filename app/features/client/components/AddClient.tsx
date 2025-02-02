
import React from 'react'
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
      >
        <List className={view === 'table' ? 'text-primary' : ''} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setView('card')}
      >
        <Grid className={view === 'card' ? 'text-primary' : ''} />
      </Button>
      <Button onClick={handleCreate} variant={'outline'}>
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
