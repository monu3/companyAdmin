import { Button, Table } from "flowbite-react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "~/features/LanguageTranslation/Languagetranslations/employee/employeeTableLangaugeTranslation";

const EmployeesTable = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "Invalid date";
  };

  const { language } = useLanguage();
  const { employees, updateEmployee, deleteEmployee } = useEmployeeContext();
  const t = translations[language]; // Get translations for the current language

  return (
    <div className="overflow-x-auto">
      {employees.length > 0 && (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>{t.sn}</Table.HeadCell>
            <Table.HeadCell>{t.name}</Table.HeadCell>
            <Table.HeadCell>{t.position}</Table.HeadCell>
            <Table.HeadCell>{t.department}</Table.HeadCell>
            <Table.HeadCell>{t.email}</Table.HeadCell>
            <Table.HeadCell>{t.salary}</Table.HeadCell>
            <Table.HeadCell>{t.joinDate}</Table.HeadCell>
            <Table.HeadCell className="text-center">{t.actions}</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {employees.map((employee, index) => (
              <Table.Row
                key={employee.email}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.jobRole}</Table.Cell>
                <Table.Cell>{employee.department}</Table.Cell>
                <Table.Cell>
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    {employee.email}
                  </a>
                </Table.Cell>
                <Table.Cell>${employee.salary.toLocaleString()}</Table.Cell>
                <Table.Cell>{formatDate(employee.enrollDate)}</Table.Cell>
                <Table.Cell className="flex justify-center gap-4">
                  <Button
                    onClick={() => updateEmployee(employee.id)}
                    className="font-medium text-cyan-600 dark:text-cyan-500"
                  >
                    {t.edit}
                  </Button>
                  <Button
                    onClick={() => deleteEmployee(employee.id)}
                    className="font-medium text-cyan-600 dark:text-cyan-500"
                  >
                    {t.delete}
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

export default EmployeesTable;
