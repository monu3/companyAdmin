import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProjectContext } from "../store/context";
import type { projectDetails } from "../types";
import { statusOptions } from "../dummyData/status";
import { useClientContext } from "~/features/client/context/ClientContext";
import { useEmployeeContext } from "~/features/employee/context/EmployeeContext";
import { addProject } from "../service/addProject";
import { updateProjectService } from "../service/editProject";
import ToastService from "~/common/utils/toastService";

const ProjectForm = ({
  selectedProject,
}: {
  selectedProject?: projectDetails | null;
}) => {
  const { clients } = useClientContext();
  const { employees } = useEmployeeContext();
  const { setIsOpen, project, setProject } = useProjectContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Pre-populate the form when selectedProject changes (only if it's in edit mode)
  useEffect(() => {
    if (selectedProject) {
      reset(selectedProject); // Reset the form with the selectedProject data
    }
  }, [selectedProject, reset]); // Only re-run when selectedProject changes

  const onSubmit = async (formData: any) => {
    if (selectedProject) {
      const updatedEmployee = await updateProjectService(
        selectedProject.id,
        formData
      );
      // Update existing project with the new form data
      const updatedData = { ...formData, id: selectedProject.id };

      setProject((prevData) =>
        prevData.map((item) =>
          item.id === updatedEmployee.id ? updatedEmployee : item
        )
      );
      ToastService.success("Update Successful", 500);
      // const updatedDataList = project.map((item) =>
      //   item.id === selectedProject.id ? { ...item, ...updatedData } : item
      // );
      // setProject(updatedDataList);
    } else {
      const newProjects = await addProject(formData);
      // const dataWithId = { ...formData, id: nanoid() };
      setProject((prevData) => [...prevData, newProjects]);
      ToastService.success("Added Successfully", 500);
    }

    setIsOpen(false); // Close the modal after saving
  };

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg overflow-y-scroll max-h-[515px] scrollbar-hidden"
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
          <div className="form-control flex flex-col">
            <label>Project Title</label>
            <input
              type="text"
              className="h-6"
              {...register("title", {
                required: "Title is required.",
              })}
            />
            {errors.title && (
              <p className="errorMsg text-error">
                {errors.title.message as string}
              </p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Category</label>
            <input
              type="text"
              className="h-6"
              {...register("category", {
                required: "Category is required.",
              })}
            />
            {errors.category && (
              <p className="errorMsg text-error">
                {errors.category.message as string}
              </p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Client</label>
            <select
              id="client"
              className="h-10"
              {...register("clientId", {
                required: "Select Client",
              })}
            >
              <option value="">Select Client</option> {/* Default option */}
              {clients.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.clientId && ( // Corrected field name
              <p className="errorMsg text-error">
                {errors.clientId.message as string}
              </p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Price</label>
            <input
              type="number"
              className="h-6"
              {...register("price", {
                required: "Price is required.",
              })}
            />
            {errors.price && (
              <p className="errorMsg text-error">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <div className="form-control flex flex-col">
            <label>Start Date</label>
            <input
              type="date"
              className="h-6"
              {...register("startDate", {
                required: "Start-Date is required.",
              })}
            />
            {errors.startDate && (
              <p className="errorMsg text-error">
                {errors.startDate.message as string}
              </p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Due Date</label>
            <input
              type="date"
              className="h-6"
              {...register("endDate", {
                required: "End-Date is required.",
              })}
            />
            {errors.endDate && (
              <p className="errorMsg text-error">
                {errors.endDate.message as string}
              </p>
            )}
          </div>

          {/*------------ commented for some time--------- */}
          {/* <div className="form-control flex flex-col">
            <label>Lead</label>
            <select
              id="lead"
              className="h-10"
              {...register("lead", {
                required: "Select team-lead",
              })}
            >
              <option value="">Select Lead</option>
              {employees.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.lead && (
              <p className="errorMsg text-error">
                {errors.lead.message as string}
              </p>
            )}
          </div> */}
          {/* -------------------------------------- */}

          {/* <div className="form-control flex flex-col">
            <label>Employee</label>
            <input
              type="number"
              className="h-6"
              {...register("employee", {
                required: "Number of employee is required.",
              })}
            />
            {errors.employee && (
              <p className="errorMsg text-error">
                {errors.employee.message as string}
              </p>
            )}
          </div> */}
          <div className="form-control flex flex-col">
            <label>Progress</label>
            <input
              type="number"
              className="h-6"
              {...register("progress", {
                required: "Progress is required.",
              })}
            />
            {errors.progress && (
              <p className="errorMsg text-error">
                {errors.progress.message as string}
              </p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Status</label>
            <select
              id="status"
              className="h-10"
              {...register("status", {
                required: "Select Status",
              })}
            >
              <option value="">Select Status</option> {/* Default option */}
              {statusOptions.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="errorMsg text-error">
                {errors.status.message as string}
              </p>
            )}
          </div>
          <div className=" flex flex-col lg:col-span-3 md:col-span-2 sm:col-span-1">
            <label>Description</label>
            <textarea
              // name=""
              id="message"
              className=" border rounded"
              {...register("description")}
              rows={5}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-5">
          <div className="form-control">
            <label></label>
            <button
              type="submit"
              className="p-3 bg-orange-400 border-none lg:rounded-lg sm:rounde-sm"
            >
              {selectedProject ? "Save Changes" : "Create"}
            </button>
          </div>
          <div className="form-control">
            <label></label>
            <button
              type="button"
              className="p-3 border-none bg-orange-400 lg:rounded-lg sm:rounde-sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
