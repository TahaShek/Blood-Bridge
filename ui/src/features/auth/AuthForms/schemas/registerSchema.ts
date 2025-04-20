import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  name: z.string().min(1, "Last name is required"),

  phoneNumber: z.string().min(1, "Last name is required"),
  bloodGroup: z.string().min(1, "Last name is required"),
  confirmPassword: z.string().min(1, "Last name is required"),
  city: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 8 characters"),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;

export const registrationFormDefaultValues: RegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  bloodGroup: "",
  city: "",
  name: "",
  confirmPassword: "",
};
