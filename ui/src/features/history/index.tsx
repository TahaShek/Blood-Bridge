"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useBloodRequests } from "@/providers/BloodRequestProvider";

export function HistoryTabs() {
  const { bloodRequests, loading, error } = useBloodRequests();
  const [donationHistory, setDonationHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/blood-donations"); // replace with your actual endpoint
        const data = await res.json();
        setDonationHistory(data);
      } catch (err) {
        console.error("Failed to fetch donation history", err);
      }
    };

    fetchDonations();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Tabs defaultValue="requests" className="space-y-4">
      <TabsList>
        <TabsTrigger value="requests">My Requests</TabsTrigger>
        <TabsTrigger value="donations">My Donations</TabsTrigger>
      </TabsList>

      {/* Requests Tab */}
      <TabsContent value="requests">
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>View your past blood requests.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-center py-8">
                Loading...
              </p>
            ) : error ? (
              <p className="text-destructive text-center py-8">
                Failed to load requests.
              </p>
            ) : (
              <div className="space-y-4">
                {bloodRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No request history found.
                    </p>
                  </div>
                ) : (
                  bloodRequests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-start space-x-4 rounded-md border p-4"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">
                            {request.bloodType} Blood Request • {request.city}
                          </p>
                          <Badge
                            variant={
                              request.status === "fulfilled"
                                ? "default"
                                : "outline"
                            }
                            className={
                              request.status === "fulfilled"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                            }
                          >
                            {request.status === "fulfilled"
                              ? "Fulfilled"
                              : "Expired"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.message}
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{formatDate(request.createdAt)}</span>
                          <span>
                            {request.donorsAccepted}/{request.donorsNeeded}{" "}
                            donors
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Donations Tab */}
      <TabsContent value="donations">
        <Card>
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>View your past blood donations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donationHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No donation history found.
                  </p>
                </div>
              ) : (
                donationHistory.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-start space-x-4 rounded-md border p-4"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {donation.bloodType} Blood Donation • {donation.city}
                        </p>
                        <Badge
                          variant="default"
                          className="bg-red-100 text-red-700 hover:bg-red-100"
                        >
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Donated to: {donation.requesterName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {donation.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(donation.donatedAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
