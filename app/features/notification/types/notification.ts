export interface Notification{
    id: string
    message: string
    recipientEmail: string
    isRead: boolean
    adminEmail: string
    createdAt: string
}

export interface NotificationProps{
    notification: Notification[]
    setNotification: React.Dispatch<React.SetStateAction<Notification[]>>;
}