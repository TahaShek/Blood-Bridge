import { z } from "zod";

export const donorSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  city: z.string().min(1, "City is required"),
  isDonating: z.boolean(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export type DonorForm = z.infer<typeof donorSchema>;

export const donorFormDefaultValues: DonorForm = {
  name: "",
  phoneNumber: "",
  bloodGroup: "",
  city: "",
  isDonating: false,
  password: "12345678",
};
