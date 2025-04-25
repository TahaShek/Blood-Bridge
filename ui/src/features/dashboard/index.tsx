import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Droplet,
  HelpCircle,
  BarChart3,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";

import { UserStatsResponse } from "@/types/userAnalytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "@/components/ui/chart";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { userAnalytics } from "@/services/userAnalyticsApi";

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<UserStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await userAnalytics();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format dates for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Chart colors
  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Error loading dashboard
          </h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Chart data
  const requestChartData = [
    { name: "Pending", value: data.record.requestStats.pending },
    { name: "Fulfilled", value: data.record.requestStats.fulfilled },
    { name: "Expired", value: data.record.requestStats.expired },
    { name: "Cancelled", value: data.record.requestStats.cancelled },
  ];

  // Activity timeline data
  const activityData = [
    {
      type: "request",
      status: data.record.requestStats.pending > 0 ? "pending" : "fulfilled",
      date: data.record?.lastRequestAt,
      message:
        data.record.requestStats.pending > 0
          ? "Blood request created"
          : "Request fulfilled",
    },
    {
      type: "account",
      status: "created",
      date: data.record?.createdAt,
      message: "Account created",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-red-50 to-white">
      <main className="flex-1 container px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, {user?.name || "User"}
              </h1>
              <p className="text-gray-500 mt-1">
                Here's an overview of your blood request activity
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatDateTime(data.record.updatedAt)}</span>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <motion.div
                variants={containerVariants}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Requests
                      </CardTitle>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">
                        {data.record.requestStats.total}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Since {formatDate(data.record?.createdAt)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Pending Requests
                      </CardTitle>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-500">
                        {data.record.requestStats.pending}
                      </div>
                      <Progress
                      color="bg-amber-500"
                        value={
                          data.record.requestStats.total > 0
                            ? (data.record.requestStats.pending /
                                data.record.requestStats.total) *
                              100
                            : 0
                        }
                        className="h-2 mt-2"
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Fulfilled Requests
                      </CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-500">
                        {data.record.requestStats.fulfilled}
                      </div>
                      <Progress
                      color="bg-green-500"
                        value={
                          data.record.requestStats.total > 0
                            ? (data.record.requestStats.fulfilled /
                                data.record.requestStats.total) *
                              100
                            : 0
                        }
                        className="h-2 mt-2"
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  {/* <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        Total Donations
                      </CardTitle>
                      <Heart className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">
                        {data.record.donationStats.total}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Lives potentially saved:{" "}
                        {data.record.donationStats.successful * 3}
                      </p>
                    </CardContent>
                  </Card> */}
                </motion.div>
              </motion.div>

              {/* Charts */}
              <motion.div
                variants={containerVariants}
                className="grid gap-6 md:grid-cols-2"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Request Status
                      </CardTitle>
                      <CardDescription>
                        Distribution of your blood requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={requestChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                percent > 0
                                  ? `${name}: ${(percent * 100).toFixed(0)}%`
                                  : ""
                              }
                            >
                              {requestChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Activity Overview
                      </CardTitle>
                      <CardDescription>
                        Your blood donation journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              {
                                name: "Requests",
                                total: data.record.requestStats.total,
                              },
                              {
                                name: "Pending",
                                total: data.record.requestStats.pending,
                              },
                              {
                                name: "Fulfilled",
                                total: data.record.requestStats.fulfilled,
                              },
                              {
                                name: "Donations",
                                total: data.record.donationStats.total,
                              },
                              {
                                name: "Successful",
                                total: data.record.donationStats.successful,
                              },
                            ]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <Bar
                              dataKey="total"
                              fill="#ef4444"
                              radius={[4, 4, 0, 0]}
                            >
                              {[
                                { name: "Requests", fill: "#ef4444" },
                                { name: "Pending", fill: "#eab308" },
                                { name: "Fulfilled", fill: "#22c55e" },
                                { name: "Donations", fill: "#3b82f6" },
                                { name: "Successful", fill: "#8b5cf6" },
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                            <Tooltip />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <Card className="border-red-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your latest actions and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {activityData.map((activity, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                activity.type === "request"
                                  ? "bg-amber-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              {activity.type === "request" ? (
                                <Droplet
                                  className={`h-5 w-5 ${
                                    activity.status === "pending"
                                      ? "text-amber-500"
                                      : "text-green-500"
                                  }`}
                                />
                              ) : (
                                <User className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                            {index < activityData.length - 1 && (
                              <div className="h-full w-px bg-gray-200 mt-2" />
                            )}
                          </div>
                          <div className="pb-6">
                            <p className="text-sm font-medium">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.date ? formatDateTime(activity.date) : "No recent activities"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <motion.div
                variants={containerVariants}
                className="grid gap-6 md:grid-cols-2"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Request Statistics
                      </CardTitle>
                      <CardDescription>
                        Detailed breakdown of your blood requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Total Requests
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                              {data.record.requestStats.total}
                            </p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-red-600" />
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                              <p className="text-sm">Pending</p>
                            </div>
                            <p className="text-sm font-medium">
                              {data.record.requestStats.pending}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                              <p className="text-sm">Fulfilled</p>
                            </div>
                            <p className="text-sm font-medium">
                              {data.record.requestStats.fulfilled}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-gray-400 mr-2" />
                              <p className="text-sm">Expired</p>
                            </div>
                            <p className="text-sm font-medium">
                              {data.record.requestStats.expired}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                              <p className="text-sm">Cancelled</p>
                            </div>
                            <p className="text-sm font-medium">
                              {data.record.requestStats.cancelled}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Create New Request
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border-red-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">
                        Request Visualization
                      </CardTitle>
                      <CardDescription>
                        Visual representation of your requests
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={requestChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {requestChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Last request: {data.record?.lastRequestAt ? formatDate(data.record.lastRequestAt) : "No requests yet"}
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-700 hover:bg-amber-200"
                      >
                        {data.record.requestStats.pending} Pending
                      </Badge>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
