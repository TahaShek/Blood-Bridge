"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface RequestCardProps {
  request: {
    id: string
    bloodType: string
    donorsNeeded: number
    city: string
    urgency: string
    message: string
    createdAt: string
    status: string
    acceptedDonors: any[]
    requesterName?: string
    requesterContact?: string
  }
  isOwner: boolean
}

export function RequestCard({ request, isOwner }: RequestCardProps) {
  const [isAccepting, setIsAccepting] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const handleAccept = () => {
    setIsAccepting(true)

    // Simulate API call
    setTimeout(() => {
      setIsAccepted(true)
      setIsAccepting(false)
      toast({
        title: "Request accepted!",
        description: "You have accepted this blood request. Contact information is now available.",
      })
    }, 1500)
  }

  const handleShowContact = () => {
    setShowContact(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {request.bloodType} Blood Request
              <Badge
                variant={
                  request.urgency === "High" ? "destructive" : request.urgency === "Medium" ? "default" : "outline"
                }
              >
                {request.urgency} Urgency
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
            <span className="font-medium">Donors Needed:</span> {request.donorsNeeded}
          </div>
          <div className="text-sm">
            <span className="font-medium">Message:</span> {request.message}
          </div>
          <div className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={
                request.status === "fulfilled"
                  ? "text-green-600"
                  : request.status === "pending"
                    ? "text-amber-600"
                    : "text-red-600"
              }
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
          {request.acceptedDonors.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">Accepted Donors:</span> {request.acceptedDonors.length}/
              {request.donorsNeeded}
            </div>
          )}

          {!isOwner && isAccepted && (
            <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
              <p className="font-medium text-green-800 mb-1">Contact Information</p>
              <p className="text-sm text-green-700">Name: {request.requesterName}</p>
              <p className="text-sm text-green-700">Phone: {request.requesterContact}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isOwner ? (
          <Button variant="outline" className="w-full" disabled={request.status === "fulfilled"}>
            {request.status === "fulfilled" ? "Fulfilled" : "Mark as Fulfilled"}
          </Button>
        ) : (
          <>
            {isAccepted ? (
              <Button variant="outline" className="w-full" onClick={handleShowContact}>
                View Contact Info
              </Button>
            ) : (
              <Button className="w-full bg-red-700 hover:bg-red-800" onClick={handleAccept} disabled={isAccepting}>
                {isAccepting ? "Accepting..." : "Accept Request"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}
