import { Button, Table } from "flowbite-react";
import { useProjectContext } from "../store/context";
import { useClientContext } from "~/features/client/context/ClientContext";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/DisplayTable";

const DisplayTable = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "Invalid date";
  };
  const { project, handleDelete, handleEdit } = useProjectContext(); // Ensure setData is available in context
  const { clients } = useClientContext();
  // console.log("client: sdfgergergerfg", clients);
  const { language } = useLanguage();
  const t = translations[language];

  const getClientName = (clientId: string) => {
    const client = clients.find((client) => client.id == clientId);
    // console.log("client: sdfgergergerfg", client);
    return client ? client.name : "Unknown Client";
  };
  return (
    <>
      <div className="overflow-x-auto">
        {project.length > 0 && (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>{t.id}</Table.HeadCell>
              <Table.HeadCell>{t.title}</Table.HeadCell>
              <Table.HeadCell>{t.client}</Table.HeadCell>
              <Table.HeadCell>{t.startDate}</Table.HeadCell>
              <Table.HeadCell>{t.deadline}</Table.HeadCell>
              <Table.HeadCell>{t.progress}</Table.HeadCell>
              <Table.HeadCell>{t.status}</Table.HeadCell>
              <Table.HeadCell className="text-center">
                {t.actions}{" "}
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {project.map((data, index) => {
                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{data.title}</Table.Cell>
                    <Table.Cell>{getClientName(data.clientId)}</Table.Cell>
                    <Table.Cell>{formatDate(data.startDate)}</Table.Cell>
                    <Table.Cell>{formatDate(data.endDate)}</Table.Cell>
                    <Table.Cell>{data.progress}</Table.Cell>
                    <Table.Cell>{data.status}</Table.Cell>
                    <Table.Cell className="flex gap-4">
                      <Button
                        className=" text-[--bg-color]"
                        onClick={() => handleEdit(data.id)}
                      >
                        Edit
                      </Button>

                      <Button
                        className=" text-[--bg-color]"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    </>
  );
};

export default DisplayTable;
