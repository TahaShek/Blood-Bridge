import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  Droplet,
  Heart,
  Hospital,
  MapPin,
  Phone,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import { BloodRequest, bloodRequestSchema } from "../schema";
import { createBloodRequest } from "@/services/bloodRequestApi";

// Define the schema

export default function RequestForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulate using the user context
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BloodRequest>({
    resolver: zodResolver(bloodRequestSchema),
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (user) {
      reset((prev) => ({
        ...prev,
        city: user?.address?.city ?? "",
        bloodGroup: user?.bloodGroup as BloodRequest["bloodGroup"],
        contactNumber: user?.phoneNumber ?? "",
        numberOfDonors: 0,
      }));
    }
  }, [user]);

  const onSubmit = async (data: BloodRequest) => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
  
      };

      await createBloodRequest(payload);
      toast({
        title: "Request sent",
        description: "Your blood request has been submitted.",
      });

      console.log("Sending:", payload);
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request.",
        variant: "destructive",
      });
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-green-100 p-6">
            <Heart className="h-16 w-16 text-red-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Request Submitted!
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          Your blood request has been created successfully.
        </p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We'll notify compatible donors in your area. You'll receive updates as
          donors respond to your request.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-600 hover:bg-red-700" asChild>
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => setIsSubmitted(false)}
          >
            Create Another Request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Main Form Fields */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Blood Group */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">Blood Group</Label>
          </div>
          <Controller
            control={control}
            name="bloodGroup"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.bloodGroup && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* Number of Donors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">
              Number of Donors Needed
            </Label>
          </div>
          <Input
            type="number"
            min={1}
            max={10}
            {...register("numberOfDonors", { valueAsNumber: true })}
            className="w-full"
          />
          {errors.numberOfDonors && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />{" "}
              {errors.numberOfDonors.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">City</Label>
          </div>
          <Input {...register("city")} className="w-full" />
          {errors.city && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.city.message}
            </p>
          )}
        </div>

        {/* Hospital */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hospital className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">Hospital</Label>
          </div>
          <Input {...register("hospital")} className="w-full" />
          {errors.hospital && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.hospital.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">Contact Number</Label>
          </div>
          <Input
            {...register("contactNumber")}
            placeholder="923123456789"
            className="w-full"
          />
          {errors.contactNumber && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.contactNumber.message}
            </p>
          )}
        </div>

        {/* Urgency Level */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-500" />
            <Label className="text-base font-medium">Urgency Level</Label>
          </div>

          <Controller
            control={control}
            name="urgencyLevel"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" />
                  <Label htmlFor="low" className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 mr-2"
                    >
                      Low
                    </Badge>
                    Within a week
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label htmlFor="medium" className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 mr-2"
                    >
                      Medium
                    </Badge>
                    Within 48 hours
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high" className="flex items-center">
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 mr-2"
                    >
                      High
                    </Badge>
                    Immediate need
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.urgencyLevel && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.urgencyLevel.message}
            </p>
          )}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Request..." : "Submit Blood Request"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
