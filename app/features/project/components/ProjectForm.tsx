import {useContext, useRef, useState} from 'react'
import { useForm } from 'react-hook-form';
import { ProjectContext, useProjectContext } from '../store/context';


const ProjectForm = () => {
  const { setIsOpen, setData } = useProjectContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setData((prevData) => [...prevData, data]);
    setIsOpen(false);
  };
  return (
    <div className='flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50'>
      <form onSubmit={handleSubmit(onSubmit)} className='relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
          <div className="form-control flex flex-col">
            <label>Project Title</label>
            <input
              type="text"
              className='h-6'
              {...register("title", {
                required: "Title is required.",

              })}
            />
            {errors.title && <p className="errorMsg text-error">{errors.title.message as string}</p>}
          </div>
          <div className="form-control flex flex-col">
            <label>Category</label>
            <input
              type="text"
              className='h-6'
              {...register("category", {
                required: "Category is required.",
              })}
            />
            {errors.category && (
              <p className="errorMsg text-error">{errors.category.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Price</label>
            <input
              type="number"
              className='h-6'
              {...register("price", {
                required: "Price is required.",
              })}
            />
            {errors.price && (
              <p className="errorMsg text-error">{errors.price.message as string}</p>
            )}
          </div>

          <div className="form-control flex flex-col">
            <label>Start Date</label>
            <input
              type="date"
              className='h-6'
              {...register("startDate", {
                required: "Start-Date is required.",

              })}
            />
            {errors.startDate && <p className="errorMsg text-error">{errors.startDate.message as string}</p>}
          </div>
          <div className="form-control flex flex-col">
            <label>Due Date</label>
            <input
              type="date"
              className='h-6'
              {...register("endDate", {
                required: "End-Date is required.",
              })}
            />
            {errors.endDate && (
              <p className="errorMsg text-error">{errors.endDate.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Lead</label>
            <select id="lead" className='h-10' {...register("lead", {
                required: "Select team-lead",
              })}>
              <option value="team-lead" selected>Select Team Lead</option>
              <option value="sujita">Sujita</option>
              <option value="sumit">Sumit</option>
              <option value="monu">Monu</option>
              <option value="diwash">Diwash</option>
            </select>
            {errors.lead && (
              <p className="errorMsg text-error">{errors.lead.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Client</label>
            <select id="client" className='h-10' {...register("client", {
                required: "Select Client",
              })}>
              <option value="client" selected>Select Client</option>
              <option value="client1">client1</option>
              <option value="client2">client2</option>
              <option value="client3">client3</option>
              <option value="client4">client4</option>
            </select>
            {errors.lead && (
              <p className="errorMsg text-error">{errors.lead.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Employee</label>
            <input
              type="number"
              className='h-6'
              {...register("employee", {
                required: "Number of employee is required.",
              })}
            />
            {errors.employee && (
              <p className="errorMsg text-error">{errors.employee.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Status</label>
            <select id="status" className='h-10' {...register("status", {
                required: "Select Status",
              })}>
              <option value="status" selected>Select status</option>
              <option value="started">Started</option>
              <option value="not-started">Not Started</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.lead && (
              <p className="errorMsg text-error">{errors.lead.message as string}</p>
            )}
          </div>
          <div className=' flex flex-col lg:col-span-3 md:col-span-2 sm:col-span-1'>
          <label>Description</label>
          <textarea name="" id="message"  className=" border rounded" rows={5}></textarea>
          </div>

        </div>
 
        <div className='flex gap-2 justify-end mt-5'>
        <div className="form-control">
            <label></label>
            <button type="submit" className='p-3 bg-info border-none lg:rounded-lg sm:rounde-sm'>Create</button>
        </div>
        <div className="form-control">
            <label></label>
            <button type="button" className='p-3 border-none bg-info lg:rounded-lg sm:rounde-sm'
            onClick={() => setIsOpen(false)}
            >Close</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
