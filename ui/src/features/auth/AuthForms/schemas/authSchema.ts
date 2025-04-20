import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type AuthFormSchema = z.infer<typeof authSchema>;

export const authSchemaDefaultValues: AuthFormSchema = {
  email: "",
  password: "",
};
