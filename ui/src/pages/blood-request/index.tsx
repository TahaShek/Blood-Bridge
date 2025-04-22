import { Button } from "@/components/ui/button";
import { RequestList } from "@/features/blood-request/components/BloodRequestsList";
import { Link } from "react-router";

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blood Requests</h1>
          <p className="text-muted-foreground">
            View and manage blood donation requests.
          </p>
        </div>
        <Link to="/requests/new">
          <Button className="bg-red-700 hover:bg-red-800">+ New Request</Button>
        </Link>
      </div>
      <RequestList />
    </div>
  );
}
