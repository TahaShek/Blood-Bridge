import { z } from "zod";

export const authSchema = z.object({
  phoneNumber: z.string(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export type AuthFormSchema = z.infer<typeof authSchema>;

export const authSchemaDefaultValues: AuthFormSchema = {
  phoneNumber: "",
  password: "",
};
