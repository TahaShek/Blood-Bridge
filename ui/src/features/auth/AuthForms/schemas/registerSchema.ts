import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    city: z.string().min(1, "City is required"),
  });

export type RegistrationForm = z.infer<typeof registrationSchema>;

export const registrationFormDefaultValues: RegistrationForm = {
  name: "",
  phoneNumber: "",
  bloodGroup: "",
  city: "",
};
