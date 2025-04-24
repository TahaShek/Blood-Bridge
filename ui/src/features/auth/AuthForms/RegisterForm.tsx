import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "@/components/ui/use-toast";
import {
  RegistrationForm,
  registrationSchema,
  registrationFormDefaultValues,
} from "./schemas/registerSchema";
import useAuth from "@/hooks/useAuth";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { useEffect } from "react";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationFormDefaultValues,
  });

  const auth = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if(auth?.user) {
      navigation("/dashboard");
    }
  }, [auth?.user]);

  const onSubmit = async (data: RegistrationForm) => {
    try {
      const { city, ...rest } = data;
      const formattedData = { ...rest, address: { city } };
      auth.register(formattedData);
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.1, 0.2)}
      className="space-y-6 max-w-md mx-auto p-5 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <motion.div
        variants={fadeIn("down", "spring", 0.2, 0.75)}
        className="space-y-2 text-center"
      >
        <h1 className="text-3xl font-bold text-red-700">Create an Account</h1>
        <p className="text-gray-500">
          Join Blood Bridge to donate or request blood
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <motion.div
          variants={fadeIn("right", "spring", 0.4, 0.75)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className="mt-1"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mt-1"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                placeholder="+923123456789"
                {...register("phoneNumber")}
                className="mt-1"
              />
              {errors.phoneNumber && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.phoneNumber.message}
                </motion.p>
              )}
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Lahore"
                {...register("city")}
                className="mt-1"
              />
              {errors.city && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.city.message}
                </motion.p>
              )}
            </div>
          </div>

          <div>
            <Label>Blood Group *</Label>
            <Select
              onValueChange={(value) => setValue("bloodGroup", value)}
              defaultValue={watch("bloodGroup")}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {errors.bloodGroup && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mt-1"
              >
                {errors.bloodGroup.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Account Security Section */}
        {/* <motion.div
          variants={fadeIn("right", "spring", 0.6, 0.75)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="mt-1"
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mt-1"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mt-1"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>
        </motion.div> */}

        {/* Submit Button */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 0.75)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 h-12 text-lg cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Registering...
              </motion.span>
            ) : (
              "Create Account"
            )}
          </Button>
        </motion.div>

        {/* Login Link */}
        <motion.div
          variants={fadeIn("up", "spring", 1, 0.75)}
          className="text-center text-sm pt-2"
        >
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-700 hover:underline font-medium"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
