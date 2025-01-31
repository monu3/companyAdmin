import { Table } from "flowbite-react";
import { useEmployeeContext } from '../context/EmployeeContext';

const EmployeesTable = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : "Invalid date";
  };

  const { employees, updateEmployee, deleteEmployee } = useEmployeeContext();

  return (
    <div className="overflow-x-auto">
      {employees.length > 0 && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Position</Table.HeadCell>
            <Table.HeadCell>Department</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Salary</Table.HeadCell>
            <Table.HeadCell>Join Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {employees.map((employee, index) => (
              <Table.Row key={employee.email} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.position}</Table.Cell>
                <Table.Cell>{employee.department}</Table.Cell>
                <Table.Cell>
                  <a href={`mailto:${employee.email}`} className="text-cyan-600 hover:underline dark:text-cyan-500">
                    {employee.email}
                  </a>
                </Table.Cell>
                <Table.Cell>${employee.salary.toLocaleString()}</Table.Cell>
                <Table.Cell>{formatDate(employee.joinDate)}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => updateEmployee(employee.id)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default EmployeesTable;