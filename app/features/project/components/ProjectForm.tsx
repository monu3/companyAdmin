import {useRef} from 'react'
import { useForm } from 'react-hook-form';

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 shadow-custom p-10'>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
          <div className="form-control flex flex-col">
            <label>Project Title</label>
            <input
              type="text"
              className='h-7'
              {...register("title", {
                required: "Title is required.",

              })}
            />
            {errors.title && <p className="errorMsg">{errors.title.message as string}</p>}
          </div>
          <div className="form-control flex flex-col">
            <label>Category</label>
            <input
              type="text"
              className='h-7'
              {...register("category", {
                required: "Category is required.",
              })}
            />
            {errors.category && (
              <p className="errorMsg">{errors.category.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Price</label>
            <input
              type="number"
              className='h-7'
              {...register("price", {
                required: "Price is required.",
              })}
            />
            {errors.price && (
              <p className="errorMsg">{errors.price.message as string}</p>
            )}
          </div>

          <div className="form-control flex flex-col">
            <label>Start Date</label>
            <input
              type="date"
              className='h-7'
              {...register("date", {
                required: "Start-Date is required.",

              })}
            />
            {errors.date && <p className="errorMsg">{errors.date.message as string}</p>}
          </div>
          <div className="form-control flex flex-col">
            <label>Due Date</label>
            <input
              type="date"
              className='h-7'
              {...register("date", {
                required: "End-Date is required.",
              })}
            />
            {errors.date && (
              <p className="errorMsg">{errors.date.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Lead</label>
            <select id="lead" className='h-8' {...register("lead", {
                required: "Select team-lead",
              })}>
              <option value="team-lead" selected>Select Team Lead</option>
              <option value="sujita">Sujita</option>
              <option value="sumit">Sumit</option>
              <option value="monu">Monu</option>
              <option value="diwash">Diwash</option>
            </select>
            {errors.lead && (
              <p className="errorMsg">{errors.lead.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Client</label>
            <select id="client" className='h-8' {...register("client", {
                required: "Select Client",
              })}>
              <option value="client" selected>Select Client</option>
              <option value="client1">client1</option>
              <option value="client2">client2</option>
              <option value="client3">client3</option>
              <option value="client4">client4</option>
            </select>
            {errors.lead && (
              <p className="errorMsg">{errors.lead.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Employee</label>
            <input
              type="number"
              className='h-7'
              {...register("employee", {
                required: "Number of employee is required.",
              })}
            />
            {errors.employee && (
              <p className="errorMsg">{errors.employee.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Client</label>
            <select id="status" className='h-8' {...register("status", {
                required: "Select Status",
              })}>
              <option value="status" selected>Select status</option>
              <option value="started">Started</option>
              <option value="not-started">Not Started</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.lead && (
              <p className="errorMsg">{errors.lead.message as string}</p>
            )}
          </div>
        </div>
        <label>Description</label>
        <textarea name="" id="message"  className="w-full border rounded" rows={5}></textarea>
        <div className='flex gap-2 justify-end mt-5'>
        <div className="form-control">
            <label></label>
            <button type="submit" className='p-3 bg-info border-none lg:rounded-lg sm:rounde-sm'>Create</button>
        </div>
        <div className="form-control">
            <label></label>
            <button type="submit" className='p-3 border-none bg-info lg:rounded-lg sm:rounde-sm'>Close</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
