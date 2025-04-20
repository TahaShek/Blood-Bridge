"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data
const requestHistory = [
  {
    id: "1",
    bloodType: "A+",
    donorsNeeded: 2,
    donorsAccepted: 2,
    city: "Lahore",
    urgency: "High",
    message: "Needed for surgery",
    createdAt: "2023-03-18T10:00:00Z",
    status: "fulfilled",
  },
  {
    id: "2",
    bloodType: "O-",
    donorsNeeded: 1,
    donorsAccepted: 0,
    city: "Lahore",
    urgency: "Medium",
    message: "Regular donation needed",
    createdAt: "2023-02-17T14:30:00Z",
    status: "expired",
  },
]

const donationHistory = [
  {
    id: "1",
    bloodType: "B+",
    requesterName: "Ali Ahmed",
    city: "Lahore",
    urgency: "High",
    message: "Emergency case, accident victim",
    donatedAt: "2023-04-16T09:15:00Z",
    status: "completed",
  },
  {
    id: "2",
    bloodType: "AB+",
    requesterName: "Sara Khan",
    city: "Lahore",
    urgency: "Low",
    message: "Scheduled transfusion",
    donatedAt: "2023-03-15T16:45:00Z",
    status: "completed",
  },
]

export function HistoryTabs() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Tabs defaultValue="requests" className="space-y-4">
      <TabsList>
        <TabsTrigger value="requests">My Requests</TabsTrigger>
        <TabsTrigger value="donations">My Donations</TabsTrigger>
      </TabsList>
      <TabsContent value="requests">
        <Card>
          <CardHeader>
            <CardTitle>Request History</CardTitle>
            <CardDescription>View your past blood requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requestHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No request history found.</p>
                </div>
              ) : (
                requestHistory.map((request) => (
                  <div key={request.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {request.bloodType} Blood Request • {request.city}
                        </p>
                        <Badge
                          variant={request.status === "fulfilled" ? "default" : "outline"}
                          className={
                            request.status === "fulfilled"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {request.status === "fulfilled" ? "Fulfilled" : "Expired"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.message}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{formatDate(request.createdAt)}</span>
                        <span>
                          {request.donorsAccepted}/{request.donorsNeeded} donors
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
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
                  <p className="text-muted-foreground">No donation history found.</p>
                </div>
              ) : (
                donationHistory.map((donation) => (
                  <div key={donation.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {donation.bloodType} Blood Donation • {donation.city}
                        </p>
                        <Badge variant="default" className="bg-red-100 text-red-700 hover:bg-red-100">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Donated to: {donation.requesterName}</p>
                      <p className="text-sm text-muted-foreground">{donation.message}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(donation.donatedAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
