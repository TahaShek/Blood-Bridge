"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { z } from "zod";
import { Droplet, Heart, CheckCircle, Users } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Define the schema
const donorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number" }),
  city: z.string().min(2, { message: "City is required" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
});

type DonorForm = z.infer<typeof donorSchema>;

const donorFormDefaultValues: Partial<DonorForm> = {
  name: "",
  phoneNumber: "",
  city: "",
  bloodGroup: "",
};

export default function DonorFormPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<DonorForm>({
    resolver: zodResolver(donorSchema),
    defaultValues: donorFormDefaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: DonorForm) => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      console.log("Donor Data:", data);
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "You've successfully registered as a donor!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Inspirational content */}
      <div className="bg-red-900 text-white md:w-1/2 p-8 md:p-12 lg:p-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto md:mx-0 md:ml-auto"
        >
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Back to Home
          </Link>

          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Blood Bridge</h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Become a Donor
          </h2>

          <div className="space-y-6 mb-8">
            <p className="text-white/90 text-lg">
              By registering as a donor, you're taking the first step toward
              saving lives in your community.
            </p>
            <div className="space-y-4">
              {[
                "One donation can save up to three lives",
                "You'll be notified when someone needs your blood type",
                "It takes just 10-15 minutes to donate blood",
                "Your contribution makes a real difference in emergencies",
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <p className="text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative h-48 w-48 mx-auto">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center text-white text-4xl font-bold">
                  B+
                </div>
              </motion.div>
              <motion.div
                className="absolute top-[50%] left-[50%] h-48 w-48 -translate-x-[50%] -translate-y-[50%] rounded-full border-4 border-dashed border-white/30"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="bg-white md:w-1/2 p-8 md:p-12 lg:p-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-green-100 p-6">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                You are now registered as a blood donor.
              </p>
              <p className="text-gray-600 mb-8">
                Your generosity can help save lives. We'll notify you when
                someone in your area needs your blood type.
              </p>
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg">
                  Return to Home
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Register as a Donor
                </h2>
                <p className="text-gray-600">
                  Fill in your details to join our life-saving community
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-red-500" />
                    <Label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      Full Name
                    </Label>
                  </div>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={`h-12 text-base ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-base font-medium text-gray-900"
                    >
                      Phone Number
                    </Label>
                  </div>
                  <Input
                    id="phoneNumber"
                    placeholder="+923123456789"
                    {...register("phoneNumber")}
                    className={`h-12 text-base ${
                      errors.phoneNumber
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <Label
                      htmlFor="city"
                      className="text-base font-medium text-gray-900"
                    >
                      City
                    </Label>
                  </div>
                  <Input
                    id="city"
                    placeholder="Lahore"
                    {...register("city")}
                    className={`h-12 text-base ${
                      errors.city
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5 text-red-500" />
                    <Label
                      htmlFor="bloodGroup"
                      className="text-base font-medium text-gray-900"
                    >
                      Blood Group
                    </Label>
                  </div>
                  <Select
                    onValueChange={(value) => setValue("bloodGroup", value)}
                    defaultValue={watch("bloodGroup")}
                  >
                    <SelectTrigger
                      className={`h-12 text-base ${
                        errors.bloodGroup
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.bloodGroup.message}
                    </p>
                  )}
                </div>

                <motion.div
                  className="pt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 h-12 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register as Donor"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
