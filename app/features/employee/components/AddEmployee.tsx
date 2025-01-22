// import React from 'react';
// import {useForm} from 'react-hook-form';
// import { AiOutlineClose } from 'react-icons/ai';
// import { Button } from '~/components/ui/button';
// interface AddEmployeeFormProps{
//   onClose: ()=>void
// }
// const AddEmployee:React.FC<AddEmployeeFormProps>= ({onClose}) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//       } = useForm();

//       const onSubmit = (data: any) => {
//         console.log(data);
//       };

//       return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
//           <AiOutlineClose
//           className="absolute top-2 right-2 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
//           onClick={onClose}
//         />
//           <div>
//             <h2>Add/Edit Employee</h2>
//           </div>
//           <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
//             <div>
//           <div className="form-control flex flex-col">
//               <label>Name</label>
//               <input
//                 type="text"

//                 {...register("name", {
//                   required: "Name is required."
//                 })}
//               />
//               {errors.name && <p className="errorMsg">{errors.name.message as string}</p>}
//             </div>
//             <div className="form-control flex flex-col">
//               <label>Position</label>
//               <input
//                 type="text"

//                 {...register("position", {
//                   required: "Position is required."
//                 })}
//               />
//               {errors.position && <p className="errorMsg">{errors.position.message as string}</p>}
//             </div>
//             <div className="form-control flex flex-col">
//               <label>Email</label>
//               <input
//                 type="text"

//                 {...register("email", {
//                   required: "Email is required.",
//                   pattern: {
//                     value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                     message: "Email is not valid."
//                   }
//                 })}
//               />
//               {errors.email && <p className="errorMsg">{errors.email.message as string}</p>}
//             </div>
//             <div className="form-control flex flex-col">
//               <label>Password</label>
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required.",
//                   minLength: {
//                     value: 6,
//                     message: "Password should be at least 6 characters."
//                   }
//                 })}
//               />
//               {errors.password && (
//                 <p className="errorMsg">{errors.password.message as string}</p>
//               )}
//             </div>
//             <div className="form-control flex flex-col">
//               <label>Department</label>
//               <input
//                 type="text"

//                 {...register("department", {
//                   required: "Department is required."
//                 })}
//               />
//               {errors.department && <p className="errorMsg">{errors.department.message as string}</p>}
//             </div>
//             </div>
//             <div>
//             <div className="form-control flex flex-col">
//               <label>Salary</label>
//               <input
//                 type="text"

//                 {...register("salary", {
//                   required: "Salary is required."
//                 })}
//               />
//               {errors.salary && <p className="errorMsg">{errors.salary.message as string}</p>}
//             </div>
//             <div className="form-control flex flex-col">
//               <label>Enroll Date</label>
//               <input
//                 type="date"

//                 {...register("date", {
//                   required: "Date is required."
//                 })}
//               />
//               {errors.date && <p className="errorMsg">{errors.date.message as string}</p>}
//             </div>
//             </div>
//             </div>
//             <div className="form-control">
//               <label></label>
//               <Button type="submit">Save</Button>
//             </div>
//           </form>
//         </div>
//         )
// }

// export default AddEmployee

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <AiOutlineClose
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Position</label>
            <input
              {...register("position", { required: "Position is required" })}
              className={errors.position ? "border-red-500" : ""}
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <input
              {...register("department", {
                required: "Department is required",
              })}
              className={errors.department ? "border-red-500" : ""}
            />
            {errors.department && (
              <p className="text-red-500 text-sm">
                {errors.department.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary</label>
            <input
              type="number"
              {...register("salary", { required: "Salary is required" })}
              className={errors.salary ? "border-red-500" : ""}
            />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Join Date</label>
            <input
              type="date"
              {...register("joinDate", { required: "Join date is required" })}
              className={errors.joinDate ? "border-red-500" : ""}
            />
            {errors.joinDate && (
              <p className="text-red-500 text-sm">{errors.joinDate.message}</p>
            )}
          </div>
        </div> */}
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
