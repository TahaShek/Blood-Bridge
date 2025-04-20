import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    city: z.string().min(1, "City is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationForm = z.infer<typeof registrationSchema>;

export const registrationFormDefaultValues: RegistrationForm = {
  name: "",
  phoneNumber: "",
  bloodGroup: "",
  city: "",
  email: "",
  password: "",
  confirmPassword: "",
};
