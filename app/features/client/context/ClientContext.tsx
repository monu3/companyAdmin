import React, { createContext, useContext, useState, useEffect } from 'react';
import type {ClientContextProps,Client } from '../types/client';
import { deleteClients, fetchClients } from '../service/clientService';



const ClientContext = createContext<ClientContextProps | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultClientDetails:Client[]=[];
  const [clients, setClients] = useState<Client[]>(defaultClientDetails);
  const [selectedClient,setSelectedClient]=useState<Client|null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"table" | "card">("table");
  const updateClient = (selectedId: string) => {
    // Find the empolyee you want to edit based on the selectedId
    const clientToEdit = clients.find(item => item.id === selectedId);
    
    // If employee is found, set it as selectedEmployee and open the modal for editing
    if (clientToEdit) {
      setSelectedClient(clientToEdit);
      setIsOpen(true);  // Open the form for editing
    }
  };

  const deleteClient = async(id: string) => {
    try{
      await deleteClients(id);
      setClients(prev => prev.filter(clients =>clients.id!==id));
    }catch(error){
      console.error(`Error deleting client with ID:${id} `,error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && clients.length > 0) {
      localStorage.setItem("clients", JSON.stringify(clients));
    }
  }, [clients]);

useEffect(() => { 
  const fetchAndSetClients=async () =>  {
  if (typeof window !== "undefined") {
    // Ensure localStorage is accessed only in the browser
    // const storedData
    const storedData=await fetchClients();
    if (storedData) {
      try {
        setClients(storedData);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    }
  }
};
fetchAndSetClients();
}, []);

  return (
    <ClientContext.Provider value={{ clients, setClients,isOpen,setIsOpen,view,setView, updateClient, deleteClient,selectedClient,setSelectedClient,isLoading,setIsLoading }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  return context;
};