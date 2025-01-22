import { useProjectContext } from '../store/context';
import { Progress, Card } from "flowbite-react";


const DisplayCard = () => {
  const formatDate = (date: string | Date): string => {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : "Invalid date";
  };
  const { data } = useProjectContext(); // Ensure setData is available in context

  

  return (
    <>
  <div className="mt-8 flex p-4 flex-wrap gap-4">
  {/* Display a Card for each project */}
  {data.map((project, index) => (
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
      <div className='border-b-2 border-solid border-gray-300 pb-1'>
        <p className="text-dark font-bold dark:text-white">
          {project.category}
        </p>
        <p className="text-gray-600">
          Project
        </p>
      </div>
      <div className='border-b-2 border-solid border-gray-300 pb-3'>
        <p className="text-gray-600 text-[11px]">Progress</p>
      <Progress
      progress={project.progress || 0} // Ensure a default value for progress
    />
      </div>
      <div className='flex text-gray-600 text-[12px] gap-4'>
        <div>
          <div>Start Date</div>
          <div className='bg-orange-500 p-1 text-white text-center'>{formatDate(project.startDate)}</div>
        </div>
        <div>
          <div>End Date</div>
          <div className='bg-red-500 p-1 text-white text-center'>{formatDate(project.endDate)}</div>
        </div>
        <div>
          <div>Project Manager</div>
          <div className='bg-yellow-200 p-1 text-center font-bold text-[15px]'>{project.lead}</div>
        </div>
      </div>
    </Card>
  ))}
</div>

    </>
  )
}

export default DisplayCard