import { createContext, useContext, useEffect, useState } from "react";
import type { NotificationProps,Notification } from "../types/notification";
import { fetchNotification } from "../service/notificationService";
import { useAuth } from "~/features/loginAndLogoutAuth/context/authContext";


const NotificationContext=createContext<NotificationProps | undefined>(undefined);

export const NotificationContextProvider: React.FC<{children: React.ReactNode}> =({
    children,
}) =>{
const defaultNotificationDetails:Notification[]=[];  
const [notification,setNotification]=useState<Notification[]>(
    defaultNotificationDetails
);
const {isAuthenticated}=useAuth();
 const fetchAndSetNotification = async () => {
    try {
      const storedData = await fetchNotification(); // Assuming this is an API call
      if (storedData) {
        setNotification(storedData); // Assuming storedData is already JSON
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
useEffect(() => {
    if (isAuthenticated) {
      fetchAndSetNotification();
    }
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
    value={{
        notification,
        setNotification
    }}
    >
        {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
    const context =useContext(NotificationContext);
    if(!context)
        throw new Error(
            "useNotificationContext must be used within an NotificaionContextProvider"
        );
    return context;
}