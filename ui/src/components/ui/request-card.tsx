import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { BloodRequestList } from "@/types";

type RequestCardProps = {
  request: BloodRequestList;
  isOwner: boolean;
  onRefresh?: () => void;
  fullfillRequest?: () => void;
};

export function RequestCard({
  request,
  isOwner,
  fullfillRequest,
}: RequestCardProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  // const [showContact, setShowContact] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      setIsAccepted(true);
      setIsAccepting(false);
      toast({
        title: "Request accepted!",
        description:
          "You have accepted this blood request. Contact information is now available.",
      });
    }, 1500);
  };

  // const handleShowContact = () => {
  //   setShowContact(true);
  // };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {request.bloodGroup} Blood Request
              <Badge
                variant={
                  request.urgencyLevel === "High"
                    ? "default"
                    : request.urgencyLevel === "Medium"
                      ? "default"
                      : "outline"
                }
              >
                {request.urgencyLevel} Urgency
              </Badge>
            </CardTitle>
            <CardDescription>
              {formatDate(request.createdAt)} • {request.city}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Donors Needed:</span>{" "}
            {request.numberOfDonors}
          </div>
          <div className="text-sm">
            <span className="font-medium">Hospital:</span> {request.hospital}
          </div>
          <div className="text-sm">
            <span className="font-medium">Message:</span> {request.message}
          </div>
          <div className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={
                request.requestStatus === "Fulfilled"
                  ? "text-green-600"
                  : request.requestStatus === "Pending"
                    ? "text-amber-600"
                    : "text-red-600"
              }
            >
              {request.requestStatus}
            </span>
          </div>

          {!isOwner && isAccepted && (
            <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
              <p className="font-medium text-green-800 mb-1">
                Contact Information
              </p>
              <p className="text-sm text-green-700">
                Phone: {request.contactNumber}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {isOwner ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={fullfillRequest}
            disabled={request.requestStatus === "Fulfilled"}
          >
            {request.requestStatus === "Fulfilled"
              ? "Fulfilled"
              : "Mark as Fulfilled"}
          </Button>
        ) : (
          <>
            {isAccepted ? (
              <Button
                variant="outline"
                className="w-full"
                // onClick={handleShowContact}
              >
                View Contact Info
              </Button>
            ) : (
              <Button
                className="w-full bg-red-700 hover:bg-red-800"
                onClick={handleAccept}
                disabled={isAccepting}
              >
                {isAccepting ? "Accepting..." : "Accept Request"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
