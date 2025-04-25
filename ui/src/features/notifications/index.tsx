
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { getNotifications } from "@/services/notiApi"

// Mock data
const notifications = [
  {
    id: "1",
    title: "Blood Request Match",
    message: "Someone in Lahore urgently needs B+ blood.",
    timestamp: "2023-04-18T10:30:00Z",
    isRead: false,
    type: "request",
    requestId: "req123",
  },
  {
    id: "2",
    title: "Request Accepted",
    message: "Ahmed Khan has accepted your blood request.",
    timestamp: "2023-04-17T14:45:00Z",
    isRead: true,
    type: "acceptance",
    donorId: "donor456",
  },
  {
    id: "3",
    title: "Request Fulfilled",
    message: "Your blood request has been fulfilled with all required donors.",
    timestamp: "2023-04-16T09:20:00Z",
    isRead: true,
    type: "fulfillment",
    requestId: "req789",
  },
]

export function NotificationList() {
  const [userNotifications, setUserNotifications] = useState(notifications)

  const fetchUserNotis = async () => {
    const res = await getNotifications();
    console.log("res::", res);
    if(res.statusCode===200) {
      setUserNotifications(res.notifications);
    }
  }

  useEffect(() => {
    fetchUserNotis()
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const markAsRead = (id: string) => {
    setUserNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setUserNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "All notifications marked as read",
    })
  }

  const handleAction = (notification: any) => {
    if (notification.type === "request") {
      // Navigate to request details
      console.log("Navigate to request", notification.requestId)
    } else if (notification.type === "acceptance") {
      // Navigate to donor details
      console.log("Navigate to donor", notification.donorId)
    }

    markAsRead(notification.id)
  }

  const unreadCount = userNotifications.filter((n) => !n.isRead).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}.
          </CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userNotifications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications yet.</p>
            </div>
          ) : (
            userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-md border p-4 ${!notification.isRead ? "bg-red-50" : ""}`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    {!notification.isRead && (
                      <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  {/* <p className="text-xs text-muted-foreground">{formatDate(notification?.createdAt)}</p> */}
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction(notification)}>
                  {notification.type === "request"
                    ? "View Request"
                    : notification.type === "acceptance"
                      ? "View Donor"
                      : "Dismiss"}
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
