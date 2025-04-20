"use client";

import { useState } from "react";

import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { toast } from "@/components/ui/use-toast";
import { RequestCard } from "@/components/ui/request-card";

// Mock data
const myRequests = [
  {
    id: "1",
    bloodType: "A+",
    donorsNeeded: 2,
    city: "Lahore",
    urgency: "High",
    message: "Needed for surgery tomorrow morning",
    createdAt: "2023-04-18T10:00:00Z",
    status: "pending",
    acceptedDonors: [],
  },
  {
    id: "2",
    bloodType: "O-",
    donorsNeeded: 1,
    city: "Lahore",
    urgency: "Medium",
    message: "Regular donation needed",
    createdAt: "2023-04-17T14:30:00Z",
    status: "pending",
    acceptedDonors: [],
  },
];

const incomingRequests = [
  {
    id: "3",
    bloodType: "B+",
    donorsNeeded: 3,
    city: "Lahore",
    urgency: "High",
    message: "Emergency case, accident victim",
    createdAt: "2023-04-16T09:15:00Z",
    status: "pending",
    acceptedDonors: [],
    requesterName: "Ali Ahmed",
    requesterContact: "+923001234567",
  },
  {
    id: "4",
    bloodType: "AB+",
    donorsNeeded: 1,
    city: "Lahore",
    urgency: "Low",
    message: "Scheduled transfusion next week",
    createdAt: "2023-04-15T16:45:00Z",
    status: "pending",
    acceptedDonors: [],
    requesterName: "Sara Khan",
    requesterContact: "+923007654321",
  },
];

export function DashboardOverview() {
  const [willingToDonate, setWillingToDonate] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    setWillingToDonate(checked);
    toast({
      title: checked
        ? "Donation status activated"
        : "Donation status deactivated",
      description: checked
        ? "You will now receive blood donation requests."
        : "You will no longer receive blood donation requests.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Donation Status</CardTitle>
          <CardDescription>
            Toggle your availability to donate blood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="donation-toggle"
              checked={willingToDonate}
              onCheckedChange={handleToggleChange}
            />
            <Label htmlFor="donation-toggle" className="font-medium">
              I&apos;m willing to donate
            </Label>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {willingToDonate
              ? "You will receive notifications for blood requests matching your blood type in your city."
              : "Toggle this switch when you're available to donate blood."}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <Link to="/dashboard/requests/new">
          <Button className="bg-red-700 hover:bg-red-800">
            + Request Blood
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">My Blood Requests</h2>
          {myRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {myRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isOwner={true}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  You haven&apos;t made any blood requests yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {willingToDonate && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Incoming Requests For You
            </h2>
            {incomingRequests.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {incomingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    isOwner={false}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">
                    No incoming blood requests matching your blood type and
                    city.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
