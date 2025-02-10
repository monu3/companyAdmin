import { useProjectContext } from "../store/context";
import { Card } from "flowbite-react";

import { Progress } from "@/components/ui/progress";
import { useClientContext } from "~/features/client/context/ClientContext";

const DisplayCard = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "Invalid date";
  };
  const { project, handleDelete, handleEdit } = useProjectContext(); // Ensure setData is available in context
  const { clients } = useClientContext();
  const getClientName = (clientId: string) => {
    const client = clients.find((client) => client.id == clientId);
    // console.log("client: sdfgergergerfg", client);
    return client ? client.name : "Unknown Client";
  };

  return (
    <>
      <div className="mt-8 flex p-4 flex-wrap gap-4">
        {/* Display a Card for each project */}
        {project.map((project, index) => (
          <Card
            key={index}
            className="w-[300px] no-underline"
            theme={{
              root: {
                base: "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
                children: "flex h-full flex-col justify-center gap-2 p-6",
                horizontal: {
                  off: "flex-col",
                  on: "flex-col md:max-w-xl md:flex-row",
                },
                href: "hover:bg-gray-100 dark:hover:bg-gray-700",
              },
            }}
          >
            <div className="border-b-2 border-solid border-gray-300 pb-1">
              <p className="text-[--color-text] lg:text-2xl sm:text:[20px]">
                {project.title}
              </p>
              <p className="text-[--color-text] lg:text-2xl">
                {getClientName(project.clientId)}
              </p>
            </div>
            <div className="border-b-2 border-solid border-gray-300 pb-3">
              <p className="text-[--color-text] sm:text-[11px] lg:text-[15px]">
                Progress
              </p>
              <Progress
                value={project.progress || 0} // Ensure a default value for progress
              />
            </div>
            <div className="flex text-gray-600 text-[12px] gap-4">
              <div>
                <div>Start Date</div>
                <div className="bg-orange-500 p-1 text-white text-center">
                  {formatDate(project.startDate)}
                </div>
              </div>
              <div>
                <div>End Date</div>
                <div className="bg-red-500 p-1 text-white text-center">
                  {formatDate(project.endDate)}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 no-underline bg-indigo-400 px-4 py-2 rounded"
                onClick={() => handleEdit(project.id)}
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 no-underline bg-indigo-400 p-2 rounded"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </a>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DisplayCard;
