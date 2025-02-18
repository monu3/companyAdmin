import { Button, Table } from "flowbite-react";
import { useNotificationContext } from "../context/NotificationContext";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
// import translations from "~/features/LanguageTranslation/LanguagetEmployeeContextranslations/employee/employeeTableLangaugeTranslation";
import { useState } from "react";
import Pagination from "~/common/utils/pagination";

const NotificationList = () => {
    const formatDate = (date: string | Date): string => {
        const parsedDate = date instanceof Date ? date : new Date(date);
        return !isNaN(parsedDate.getTime())
          ? parsedDate.toLocaleDateString()
          : "Invalid date";
      };
    
      const { language } = useLanguage();
      const {notification,setNotification} = useNotificationContext();
    //   const t = translations[language]; // Get translations for the current language
    
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5);
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedTasks = notification.slice(startIndex, startIndex + itemsPerPage);
      return (
        <>
          <div className="overflow-x-auto">
            {notification.length > 0 && (
              <Table striped hoverable>
                <Table.Head>
                  <Table.HeadCell>sn</Table.HeadCell>
                  <Table.HeadCell>message</Table.HeadCell>
                  <Table.HeadCell>reciptEmail</Table.HeadCell>
                  <Table.HeadCell>isRead</Table.HeadCell>
                  <Table.HeadCell>createdAt</Table.HeadCell>
                  {/* <Table.HeadCell>{t.salary}</Table.HeadCell>
                  <Table.HeadCell>{t.joinDate}</Table.HeadCell> */}
                  {/* <Table.HeadCell className="text-center">
                    {t.actions}
                  </Table.HeadCell> */}
                </Table.Head>
    
                <Table.Body className="divide-y">
                  {paginatedTasks.map((notification, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </Table.Cell>
                      <Table.Cell>{notification.message}</Table.Cell>
                      <Table.Cell>{notification.recipientEmail}</Table.Cell>
                      <Table.Cell>{notification.isRead}</Table.Cell>
                      {/* <Table.Cell>{notification.adminEmail</Table.Cell> */}
                      <Table.Cell>{formatDate(notification.createdAt)}</Table.Cell>
                      {/* <Table.Cell className="flex justify-center gap-4">
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
                      </Table.Cell> */}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-[--color-bg] py-3 border-t shadow-md">
            <Pagination
              totalItems={notification.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </>
      );
}

export default NotificationList