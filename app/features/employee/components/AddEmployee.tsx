import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import type { Employee } from "../types/employee";

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

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <AiOutlineClose
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          <div>
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
            {/* <div className="form-control flex flex-col">
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters.",
                  },
                })}
              />
              {errors.password && (
                <p className="errorMsg">{errors.password.message as string}</p>
              )}
            </div> */}
            <div className="form-control flex flex-col">
              <label>Department</label>
              <input
                type="text"
                {...register("department", {
                  required: "Department is required.",
                })}
              />
              {errors.department && (
                <p className="errorMsg">
                  {errors.department.message as string}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="form-control flex flex-col">
              <label>Salary</label>
              <input
                type="text"
                {...register("salary", {
                  required: "Salary is required.",
                })}
              />
              {errors.salary && (
                <p className="errorMsg">{errors.salary.message as string}</p>
              )}
            </div>
            <div className="form-control flex flex-col">
              <label>Enroll Date</label>
              <input
                type="date"
                {...register("joinDate", {
                  required: "Date is required.",
                })}
              />
              {errors.joinDate && (
                <p className="errorMsg">{errors.joinDate.message as string}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {employee ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
};
