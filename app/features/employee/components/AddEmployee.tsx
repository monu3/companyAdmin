import React from 'react';
import {useForm} from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
interface AddEmployeeFormProps{
  onClose: ()=>void
}
const AddEmployee:React.FC<AddEmployeeFormProps>= ({onClose}) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data: any) => {
        console.log(data);
      };
    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <AiOutlineClose
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
          onClick={onClose}
        />
          <div>
            <h2>Add/Edit Employee</h2>
          </div>
          <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
            <div>
          <div className="form-control flex flex-col">
              <label>Name</label>
              <input
                type="text"
               
                {...register("name", {
                  required: "Name is required."
                })}
              />
              {errors.name && <p className="errorMsg">{errors.name.message as string}</p>}
            </div>
            <div className="form-control flex flex-col">
              <label>Position</label>
              <input
                type="text"
               
                {...register("position", {
                  required: "Position is required."
                })}
              />
              {errors.position && <p className="errorMsg">{errors.position.message as string}</p>}
            </div>
            <div className="form-control flex flex-col">
              <label>Email</label>
              <input
                type="text"
               
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid."
                  }
                })}
              />
              {errors.email && <p className="errorMsg">{errors.email.message as string}</p>}
            </div>
            <div className="form-control flex flex-col">
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters."
                  }
                })}
              />
              {errors.password && (
                <p className="errorMsg">{errors.password.message as string}</p>
              )}
            </div>
            <div className="form-control flex flex-col">
              <label>Department</label>
              <input
                type="text"
               
                {...register("department", {
                  required: "Department is required."
                })}
              />
              {errors.department && <p className="errorMsg">{errors.department.message as string}</p>}
            </div>
            </div>
            <div>
            <div className="form-control flex flex-col">
              <label>Salary</label>
              <input
                type="text"
               
                {...register("salary", {
                  required: "Salary is required."
                })}
              />
              {errors.salary && <p className="errorMsg">{errors.salary.message as string}</p>}
            </div>
            <div className="form-control flex flex-col">
              <label>Enroll Date</label>
              <input
                type="date"
               
                {...register("date", {
                  required: "Date is required."
                })}
              />
              {errors.date && <p className="errorMsg">{errors.date.message as string}</p>}
            </div>
            </div>
            </div>
            <div className="form-control">
              <label></label>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
        )
}

export default AddEmployee

