import { z } from "zod";

export const authSchema = z.object({
  phoneNumber: z.string()
  .min(1, "Phone number is required")
  .regex(/^[0-9]+$/, "Must contain only numbers")
  .min(10, "Must be at least 10 digits")
  .max(15, "Must be at most 15 digits"),
});

export type AuthFormSchema = z.infer<typeof authSchema>;

export const authSchemaDefaultValues: AuthFormSchema = {
  phoneNumber: "",
};
