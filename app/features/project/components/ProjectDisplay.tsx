import React from 'react'
import { Table } from "flowbite-react";
import { useProjectContext } from '../store/context';
import { Card } from "flowbite-react";

const ProjectDisplay = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : "Invalid date";
  };
  const {data} = useProjectContext();

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
        <Table.HeadCell>Status</Table.HeadCell>
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
          <Table.Cell>{data.status}</Table.Cell>
        </Table.Row>
              )
        })
              
        }
              </Table.Body>
      
      
    
    </Table>
  } 
  </div>

  <div className="mt-8 space-y-4">
        {/* Display a Card for each project */}
        {data.map((project, index) => (
          <Card key={index} href="#" className="max-w-sm no-underline">
            <p className="text-indigo dark:text-white">
              {project.category}
            </p>
            <p className='border-b-2 border-solid border-red-500'>Project</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
          </Card>
        ))}
      </div>
    </>
  )
}

export default ProjectDisplay
