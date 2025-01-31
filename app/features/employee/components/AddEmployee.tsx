import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import type { Employee } from "../types/employee";
import { addEmployee } from "../service/addEmployeeService";
import { Department, JobRole } from "../service/enums"; // Import the enums
import { getUserEmail } from "~/common/utils/getUserEmail";

interface EmployeeFormProps {
  onClose: () => void;
  onSubmit: (data: Employee) => void;
  employee?: Employee;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onClose,
  onSubmit,
  employee,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: employee,
  });

  const handleFormSubmit = async (data: Employee) => {
    try {
      const companyEmail = getUserEmail();
      if (!companyEmail) {
        throw new Error("Company email not found.");
      }
      const employeeData = { ...data };
      const savedEmployee = await addEmployee(employeeData, companyEmail);
      onSubmit(savedEmployee);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <AiOutlineClose
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-orange-400 dark:hover:text-orange-400"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="form-control flex flex-col">
            <label>Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required.",
              })}
            />
            {errors.name && (
              <p className="errorMsg">{errors.name.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Position</label>
            <input
              type="text"
              {...register("position", {
                required: "Position is required.",
              })}
            />
            {errors.position && (
              <p className="errorMsg">{errors.position.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
            />
            {errors.email && (
              <p className="errorMsg">{errors.email.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Department</label>
            <select
              {...register("department", {
                required: "Department is required.",
              })}
            >
              <option value="">Select Department</option>
              {Object.values(Department).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="errorMsg">{errors.department.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Job Role</label>
            <select
              {...register("jobRole", {
                required: "Job Role is required.",
              })}
            >
              <option value="">Select Job Role</option>
              {Object.values(JobRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.jobRole && (
              <p className="errorMsg">{errors.jobRole.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Enroll Date</label>
            <input
              type="date"
              {...register("enrollDate", {
                required: "Enroll Date is required.",
              })}
            />
            {errors.enrollDate && (
              <p className="errorMsg">{errors.enrollDate.message as string}</p>
            )}
          </div>
        </div>
        <div className="form-control flex flex-col">
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "Description is required.",
            })}
          />
          {errors.description && (
            <p className="errorMsg">{errors.description.message as string}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose} className="bg-orange-400">
            Cancel
          </Button>
          <Button type="submit" variant="outline" className="bg-orange-400">
            {employee ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
};
