import AddField from "../components/addField";
import ListTasks from "../components/listTasks";
import SearchForm from "../components/searchForm";

const TaskPage = () => {
  return (
    <section className="h-auto px-4 md:px-6 dark:bg-[#494242] mt-20">
      <div className="flex justify-between items-center">
        <h2>Task</h2>
        <div className="flex justify-end ml-10 gap-6">
          <AddField />
          <ListTasks />
        </div>
      </div>
      {/* <div className="container mx-auto max-w-7xl"> */}
        <div className="space-y-4 mb-12 "></div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 "></div>
        <SearchForm />
      {/* </div> */}
    </section>
  );
};

export default TaskPage;
