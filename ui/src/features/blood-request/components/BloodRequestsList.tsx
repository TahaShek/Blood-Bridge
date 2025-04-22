// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { RequestCard } from "@/components/ui/request-card"

// // Mock data
// const myRequests = [
//   {
//     id: "1",
//     bloodType: "A+",
//     donorsNeeded: 2,
//     city: "Lahore",
//     urgency: "High",
//     message: "Needed for surgery tomorrow morning",
//     createdAt: "2023-04-18T10:00:00Z",
//     status: "pending",
//     acceptedDonors: [],
//   },
//   {
//     id: "2",
//     bloodType: "O-",
//     donorsNeeded: 1,
//     city: "Lahore",
//     urgency: "Medium",
//     message: "Regular donation needed",
//     createdAt: "2023-04-17T14:30:00Z",
//     status: "pending",
//     acceptedDonors: [],
//   },
// ]

// const incomingRequests = [
//   {
//     id: "3",
//     bloodType: "B+",
//     donorsNeeded: 3,
//     city: "Lahore",
//     urgency: "High",
//     message: "Emergency case, accident victim",
//     createdAt: "2023-04-16T09:15:00Z",
//     status: "pending",
//     acceptedDonors: [],
//     requesterName: "Ali Ahmed",
//     requesterContact: "+923001234567",
//   },
//   {
//     id: "4",
//     bloodType: "AB+",
//     donorsNeeded: 1,
//     city: "Lahore",
//     urgency: "Low",
//     message: "Scheduled transfusion next week",
//     createdAt: "2023-04-15T16:45:00Z",
//     status: "pending",
//     acceptedDonors: [],
//     requesterName: "Sara Khan",
//     requesterContact: "+923007654321",
//   },
// ]

// export function RequestList() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterBloodType, setFilterBloodType] = useState("all")
//   const [filterUrgency, setFilterUrgency] = useState("all")

//   const filterRequests = (requests: any[]) => {
//     return requests.filter((request) => {
//       const matchesSearch =
//         request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         request.message.toLowerCase().includes(searchTerm.toLowerCase())

//       const matchesBloodType = filterBloodType === "all" || request.bloodType === filterBloodType
//       const matchesUrgency = filterUrgency === "all" || request.urgency === filterUrgency

//       return matchesSearch && matchesBloodType && matchesUrgency
//     })
//   }

//   const filteredMyRequests = filterRequests(myRequests)
//   const filteredIncomingRequests = filterRequests(incomingRequests)

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Blood Requests</CardTitle>
//         <CardDescription>View and manage blood donation requests.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div className="col-span-1 md:col-span-1">
//               <Input
//                 placeholder="Search by city or message"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="col-span-1 md:col-span-1">
//               <Select value={filterBloodType} onValueChange={setFilterBloodType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Filter by blood type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Blood Types</SelectItem>
//                   <SelectItem value="A+">A+</SelectItem>
//                   <SelectItem value="A-">A-</SelectItem>
//                   <SelectItem value="B+">B+</SelectItem>
//                   <SelectItem value="B-">B-</SelectItem>
//                   <SelectItem value="AB+">AB+</SelectItem>
//                   <SelectItem value="AB-">AB-</SelectItem>
//                   <SelectItem value="O+">O+</SelectItem>
//                   <SelectItem value="O-">O-</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="col-span-1 md:col-span-1">
//               <Select value={filterUrgency} onValueChange={setFilterUrgency}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Filter by urgency" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Urgency Levels</SelectItem>
//                   <SelectItem value="Low">Low</SelectItem>
//                   <SelectItem value="Medium">Medium</SelectItem>
//                   <SelectItem value="High">High</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <Tabs defaultValue="my-requests" className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="my-requests">My Requests</TabsTrigger>
//               <TabsTrigger value="incoming-requests">Incoming Requests</TabsTrigger>
//             </TabsList>
//             <TabsContent value="my-requests">
//               {filteredMyRequests.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-muted-foreground">No requests found matching your filters.</p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4 md:grid-cols-2">
//                   {filteredMyRequests.map((request) => (
//                     <RequestCard key={request.id} request={request} isOwner={true} />
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//             <TabsContent value="incoming-requests">
//               {filteredIncomingRequests.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-muted-foreground">No incoming requests found matching your filters.</p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4 md:grid-cols-2">
//                   {filteredIncomingRequests.map((request) => (
//                     <RequestCard key={request.id} request={request} isOwner={false} />
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestCard } from "@/components/ui/request-card";
import { useBloodRequests } from "@/providers/BloodRequestProvider";

export function RequestList() {
  const { bloodRequests, loading, error, refreshRequests } = useBloodRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");

  const myRequests = bloodRequests;

  const filterRequests = (requests: any[]) => {
    return requests.filter((request) => {
      const matchesSearch =
        request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.message &&
          request.message.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesBloodType =
        filterBloodType === "all" || request.bloodType === filterBloodType;
      const matchesUrgency =
        filterUrgency === "all" || request.urgency === filterUrgency;

      return matchesSearch && matchesBloodType && matchesUrgency;
    });
  };

  const filteredRequests = filterRequests(myRequests);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Blood Requests</CardTitle>
          <CardDescription>Loading your requests...</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            Loading your blood requests...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Blood Requests</CardTitle>
          <CardDescription>Error loading your requests</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={refreshRequests}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Blood Requests</CardTitle>
        <CardDescription>
          View and manage your blood donation requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 md:col-span-1">
              <Input
                placeholder="Search by city or message"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Select
                value={filterBloodType}
                onValueChange={setFilterBloodType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Types</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 md:col-span-1">
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency Levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main requests list */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ||
                filterBloodType !== "all" ||
                filterUrgency !== "all"
                  ? "No requests found matching your filters."
                  : "You haven't created any blood requests yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isOwner={true}
                  onRefresh={refreshRequests}
                />
              ))}
            </div>
          )}

          {/* Commented out incoming requests section */}
          {/*
          <Tabs defaultValue="my-requests" className="space-y-4">
            <TabsList>
              <TabsTrigger value="my-requests">My Requests</TabsTrigger>
              <TabsTrigger value="incoming-requests">Incoming Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="incoming-requests">
              {filteredIncomingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No incoming requests found matching your filters.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredIncomingRequests.map((request) => (
                    <RequestCard 
                      key={request.id} 
                      request={request} 
                      isOwner={false}
                      onRefresh={refreshRequests}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          */}
        </div>
      </CardContent>
    </Card>
  );
}
