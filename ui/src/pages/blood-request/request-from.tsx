import RequestForm from "@/features/blood-request/components/BloodRequestForm";

export default function NewRequestPage() {
  return (
    <div className="space-y-6 min-h-screen bg-gradient-to-b from-red-50 to-white  px-4 py-8 md:py-12 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Blood Request
        </h1>
        <p className="text-muted-foreground">
          Fill out the form to request blood donation.
        </p>
      </div>
      <RequestForm />
    </div>
  );
}
