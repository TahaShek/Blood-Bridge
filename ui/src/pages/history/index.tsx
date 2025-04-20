import { HistoryTabs } from "@/features/history";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground">
          View your blood donation history.
        </p>
      </div>
      <HistoryTabs />
    </div>
  );
}
