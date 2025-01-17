import React from 'react';
import {useForm} from 'react-hook-form';
const AddEmployee = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data: any) => {
        console.log(data);
      };
    
      return (
        <div className="App">
          <form>
            <div className="form-control">
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
            <div className="form-control">
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
            <div className="form-control">
              <label></label>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
        )
}

export default AddEmployee

