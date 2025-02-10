import { Button, Table } from "flowbite-react";
import { useClientContext } from "../context/ClientContext";

const ClientTable = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "Invalid date";
  };

  const { clients, updateClient, deleteClient } = useClientContext();
  console.log(clients);

  return (
    <div className="overflow-x-auto">
      {clients.length > 0 && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>S.N.</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Join Date</Table.HeadCell>
            <Table.HeadCell className="text-center">Actions </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {clients.map((client, index) => (
              <Table.Row
                key={client.email}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{client.name}</Table.Cell>
                <Table.Cell>
                  <a
                    href={`mailto:${client.email}`}
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    {client.email}
                  </a>
                </Table.Cell>
                <Table.Cell>{formatDate(client.joinDate)}</Table.Cell>
                <Table.Cell className="flex justify-center gap-4 ">
                  <Button
                    onClick={() => updateClient(client.id)}
                    className="font-medium text-cyan-600  dark:text-cyan-500"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteClient(client.id)}
                    className="font-medium text-cyan-600  dark:text-cyan-500"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ClientTable;
