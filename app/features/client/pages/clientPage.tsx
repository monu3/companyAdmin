import React, { useState, useEffect } from 'react';
import { AddClient } from '../components/AddClient';
import ClientCard from '../components/ClientCard';
import NoClient from '../components/NoClient';
import { Button } from '@/components/ui/button';
import { PlusCircle, Grid, List, Pencil, Trash } from 'lucide-react';
import type{Client} from '../types/client'

const ClientPage = () => {
  const [client, setClient] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load employees from localStorage on mount
  useEffect(() => {
    const storedClient = localStorage.getItem('clientList');
    if (storedClient) {
      setClient(JSON.parse(storedClient));
    }
  }, []);

  // Save employees to localStorage when they change
  useEffect(() => {
    if(client.length>0){
    localStorage.setItem('clientList', JSON.stringify(client));
    }
  }, [client]);

  const addClient = (data: Omit<Client, 'id'>) => {
    const newClient = {
      ...data,
      id: crypto.randomUUID()
    };
    setClient(prev => [...prev, newClient]);
  };

  const updateClient = (updatedClient: Client) => {
    setClient(prev =>
      prev.map(cli => (cli.id === updatedClient.id ? updatedClient : cli))
    );
  };

  const deleteClient = (id: string) => {
    setClient(prev => prev.filter(cli => cli.id !== id));
  };

  const handleSubmit = (data: Client) => {
    if (editingClient) {
      updateClient({ ...data, id: editingClient.id });
      setEditingClient(null);
    } else {
      addClient(data);
    }
    setIsOpen(false);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Client</h1>
          <p className="text-gray-500">Manage your Client</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className='dark:text-text'
          >
            <List className={viewMode === 'list' ? 'text-primary' : ''} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className={viewMode === 'grid' ? 'text-primary' : ''} />
          </Button>
          <Button onClick={() => setIsOpen(true)} variant={'outline'} className='dark:text-text'>
            <PlusCircle/>
          </Button>
        </div>
      </div>

      {client.length === 0 ? (
        <NoClient />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4' : 'space-y-4'}>
          {client.map((client) => (
            <div key={client.id} className="relative group">
              <div className="absolute right-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingClient(client)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteClient(client.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <ClientCard {...client} />
            </div>
          ))}
        </div>
      )}

      {(isOpen || editingClient) && (
        <AddClient
          onClose={() => {
            setIsOpen(false);
            setEditingClient(null);
          }}
          onSubmit={handleSubmit}
          client={editingClient || undefined}
        />
      )}
    </div>
  );
};

export default ClientPage;