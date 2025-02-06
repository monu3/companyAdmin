import { getUserEmail } from "~/common/utils/getUserEmail";
import type { Client } from "../types/client";
import { apiRequest } from "~/common/api/backendApi";


const userEmail = getUserEmail();
export const addClient =async (client: Client): Promise<Client> => {
    try {
        const response = await apiRequest("/client", {
            method: "POST",
            body: {client, userEmail},
        });
        return response;  
    }catch(error){
        console.error("Error adding client:",error);
        throw error;
    }
};

export const fetchClients= async (): Promise<Client[]> =>{
    if(!userEmail){
        throw new Error("No user email found in local storage.")
    }
    try{
        return await apiRequest(`/clients?emailCompany=${userEmail}`);
    }catch(error){
        console.error("Error fetching clients:",error);
        throw error;
    }
}