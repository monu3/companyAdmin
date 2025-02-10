import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import type { Client} from "../types/client";
import { useClientContext } from "../context/ClientContext";
import { nanoid } from "nanoid";
import { addClient, editClients } from "../service/clientService";
import ToastService from "~/common/utils/toastService";

export const ClientForm = ({
selectedClient
}:{selectedClient?:Client | null}) => {
  const {setIsOpen,setClients,setIsLoading}=useClientContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() =>{
    if(selectedClient){
      reset(selectedClient);
    }
  },[selectedClient,reset]);

  const onSubmit = async(formData: any) => {
    console.log("Form submitted with selectedId:", selectedClient?.id);  // Log the selectedClient ID
    console.log("Form data:", formData);
  try{
    if (selectedClient) {
      // Update existing client with the new form data
      const updatedClient = await editClients(selectedClient.id, formData);
     
      setClients(prevData =>
        prevData.map(item =>
          item.id===updatedClient.id ? updatedClient: item
        )
      );
      ToastService.success("Update Successful",500);
    } else {
      // If no selectedClient, create a new one
      const newClient = await addClient(formData);
      setIsLoading(true);
      setClients(prevData => [...prevData, newClient]);
      ToastService.success("Added Successfully",500);
    }
  
    setIsOpen(false);
  }catch(error){
    console.error("Error saving client: ", error);
    ToastService.error("Failed",500);
  }  // Close the modal after saving
  };
  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <AiOutlineClose
          className="absolute top-2 right-2 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
          onClick={()=>setIsOpen(false)}
        />
        <h2 className="text-xl font-semibold">
          {selectedClient ? "Edit Client" : "Add Client"}
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
              {selectedClient?<input
                type="text"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              readOnly />:<input
                type="text"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              />}
              {errors.email && (
                <p className="errorMsg">{errors.email.message as string}</p>
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
          <div className="form-control">
          <Button variant="outline" type="button" onClick={()=>setIsOpen(false)}>
            Cancel
          </Button>
          </div>
          <div className="form-control">
          <Button type="submit">
            {selectedClient ? "Update Client" : "Add Client"}
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
