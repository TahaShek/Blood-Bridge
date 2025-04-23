import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  AuthFormSchema,
  authSchema,
  authSchemaDefaultValues,
} from "./schemas/authSchema";
import useAuth from "@/hooks/useAuth";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: authSchemaDefaultValues,
  });

  const auth = useAuth();
  const onSubmit = async (data: AuthFormSchema) => {
    setIsSubmitting(true);

    try {
      await auth.login(data);
      // On successful login
      navigate("/dashboard");
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully",
        variant: "default",
      });
    } catch (error) {
      console.error(error.message);

      // Show error in toast
      toast({
        title: "Login Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-red-700 ">Welcome Back</h1>
        <p className="text-gray-500">Login to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="phoneNumber"
            placeholder=""
            type="text"
            {...register("phoneNumber")}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("password")}
            className="mt-1 block w-full"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-red-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </motion.div>

        <div className="text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-red-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
