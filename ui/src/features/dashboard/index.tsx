"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { toggleDonationStatus } from "@/services/authApi";
import useAuth from "@/hooks/useAuth";
import { useBloodRequests } from "@/providers/BloodRequestProvider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardOverview() {
  const { user } = useAuth();
  const { bloodRequests, loading, error, refreshRequests } = useBloodRequests();
  const [willingToDonate, setWillingToDonate] = useState(
    user?.isDonating || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("all");
  const [filterUrgency, setFilterUrgency] = useState("all");

  // Filter requests based on search and filters
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

  const filteredMyRequests = filterRequests(bloodRequests);
  const filteredIncomingRequests = willingToDonate
    ? filterRequests(bloodRequests.filter((req) => !req.isOwner))
    : [];

  // Sync local state with user data when it changes
  useEffect(() => {
    if (user) {
      console.log(user.isDonating, "is donating");
      setWillingToDonate(user.isDonating);
    }
  }, [user]);

  const handleToggleChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      // Call API to toggle status and get updated user
      const updatedUser = await toggleDonationStatus();

      // Update local state with the response
      setWillingToDonate(updatedUser.isDonating);

      toast({
        title: updatedUser.isDonating
          ? "Donation status activated"
          : "Donation status deactivated",
        description: updatedUser.isDonating
          ? "You will now receive blood donation requests."
          : "You will no longer receive blood donation requests.",
      });
    } catch (error) {
      // Revert on error
      setWillingToDonate(!checked);
      toast({
        title: "Error",
        description: "Failed to update donation status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
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
        <Link to="/requests/new">
          <Button className="bg-red-700 hover:bg-red-800">
            + Request Blood
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* My Blood Requests Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Blood Requests</h2>
          {loading ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  Loading your requests...
                </p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-red-500">{error}</p>
                <div className="flex justify-center mt-4">
                  <Button onClick={refreshRequests} variant="outline">
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : filteredMyRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredMyRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isOwner={true}
                  onRefresh={refreshRequests}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  {searchTerm ||
                  filterBloodType !== "all" ||
                  filterUrgency !== "all"
                    ? "No requests found matching your filters."
                    : "You haven't made any blood requests yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Incoming Requests Section (only shown if willing to donate) */}
        {willingToDonate && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Incoming Requests For You</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search requests"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-40"
                />
                <Select
                  value={filterBloodType}
                  onValueChange={setFilterBloodType}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Blood Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
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
                <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredIncomingRequests.length > 0 ? (
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
            ) : (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">
                    {searchTerm ||
                    filterBloodType !== "all" ||
                    filterUrgency !== "all"
                      ? "No incoming requests match your filters."
                      : "No incoming blood requests matching your blood type and city."}
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
