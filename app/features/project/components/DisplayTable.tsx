import { Table } from "flowbite-react";
import { useProjectContext } from '../store/context';


const DisplayTable = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : "Invalid date";
  };
  const { data, handleDelete, handleEdit } = useProjectContext(); // Ensure setData is available in context

  

  return (
    <>
          <div className="overflow-x-auto">
    {
      data.length > 0 &&
    <Table striped>
      <Table.Head>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Title</Table.HeadCell>
        <Table.HeadCell>Client</Table.HeadCell>
        <Table.HeadCell>Start Date</Table.HeadCell>
        <Table.HeadCell>Deadline</Table.HeadCell>
        <Table.HeadCell>Progress</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>
            <span className="sr-only">Edit</span>
        </Table.HeadCell>
        <Table.HeadCell>
            <span className="sr-only">Delete</span>
        </Table.HeadCell>
      </Table.Head>
      

      <Table.Body className="divide-y">
            {data.map((data, index) => {
              return(
<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</Table.Cell>
          <Table.Cell>{data.title}</Table.Cell>
          <Table.Cell>{data.client}</Table.Cell>
          <Table.Cell>{formatDate(data.startDate)}</Table.Cell>
          <Table.Cell>{formatDate(data.endDate)}</Table.Cell>
          <Table.Cell>{data.progress}</Table.Cell>
          <Table.Cell>{data.status}</Table.Cell>
          <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleEdit(data.id)}>
                Edit
              </a>
          </Table.Cell>
          <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleDelete(data.id)}>
                Delete
              </a>
          </Table.Cell>
        </Table.Row>
              )
        })
              
        }
              </Table.Body>
      
      
    
    </Table>
  } 
  </div>
    </>
  )
}

export default DisplayTable