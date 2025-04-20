import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  AuthFormSchema,
  authSchema,
  authSchemaDefaultValues,
} from "./schemas/authSchema";
import useAuth from "@/hooks/useAuth";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    auth.login(data);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);

      toast({
        title: "Login successful!",
        description: "You are now logged in.",
      });
      setIsSubmitting(false);
      // Redirect to dashboard in a real app
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-red-700">Welcome Back</h1>
        <p className="text-gray-500">Login to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            {...register("email")}
            className="mt-1 block w-full"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
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
