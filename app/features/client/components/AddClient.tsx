import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import type { Client } from "../types/client";

/**
 * AddClient.tsx
 * Created On : 2025-29-01 11
 * Author : Sumit Kumar Shrestha
 * Description : 
 */

interface ClientFormProps {
  onClose: () => void;
  onSubmit: (data: Client) => void;
  client?: Client;
}

export const AddClient: React.FC<ClientFormProps> = ({
  onClose,
  onSubmit,
  client,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({
    defaultValues: client,
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
          {client ? "Edit Client" : "Add Client"}
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
            <label>Budget</label>
            <input
              type="text"
              {...register("budget", {
                required: "Budget is required.",
              })}
            />
            {errors.budget && (
              <p className="errorMsg">{errors.budget.message as string}</p>
            )}
          </div>
          <div className="form-control flex flex-col">
            <label>Project Name</label>
            <input
              type="text"
              {...register("projectName", {
                required: "Project is required.",
              })}
            />
            {errors.projectName && (
              <p className="errorMsg">{errors.projectName.message as string}</p>
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
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onClose}  className="bg-orange-400">
            Cancel
          </Button>
          <Button type="submit" variant="outline" className="bg-orange-400">
            {client ? "Update Client" : "Add Client"}
          </Button>
        </div>
      </form>
    </div>
  );
};
