import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    city: z.string().min(1, "City is required"),
    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .optional(),
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
  password: "",
  confirmPassword: "",
};
