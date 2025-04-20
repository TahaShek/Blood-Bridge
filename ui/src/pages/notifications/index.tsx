import { NotificationList } from "@/features/notifications";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View your blood donation notifications.</p>
      </div>
      <NotificationList />
    </div>
  )
}
