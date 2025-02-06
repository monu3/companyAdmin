export interface ClientContextProps {
  clients: Client[];
  setClients:React.Dispatch<React.SetStateAction<Client[]>>;
  updateClient: (id: string) => void;
  deleteClient: (id: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  view: "table" | "card"; // Union type for the possible values of `view`
  setView: React.Dispatch<React.SetStateAction<"table" | "card">>;
  selectedClient:Client|null;
  setSelectedClient:React.Dispatch<React.SetStateAction<Client|null>>;
}
export interface Client {
    id: string;
    name: string;
    email: string;
    password:string;
    joinDate: string;
  }