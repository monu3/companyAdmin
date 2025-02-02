import React from 'react'
import { useClientContext } from '../context/ClientContext'
import NoEmployee from './NoClient';
import ClientCard from './ClientCard';
import ClientTable from './ClientTable';

const ClientDisplay = () => {
    const {view,clients}=useClientContext();
  return (
    <div>
    {clients.length===0?(<NoEmployee/>):(
        <div>
            {view === "table"?<ClientTable/> :<ClientCard/>}
        </div>
    )

    }
    </div>
  );
}

export default ClientDisplay