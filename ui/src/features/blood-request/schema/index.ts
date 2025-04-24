import { z } from "zod";

export const bloodRequestSchema = z.object({
  isForSelf: z.boolean().default(false),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  numberOfDonors: z.number().int().positive().max(10).default(1),
  city: z.string().min(1),
  hospital: z.string().min(1),
  urgencyLevel: z.enum(["Low", "Medium", "High"]).default("Medium"),
  contactNumber: z.string().regex(/^92\d{10}$/),
});

export type BloodRequest = z.infer<typeof bloodRequestSchema>;

export const defaultBloodRequest: BloodRequest = {
  isForSelf: false,
  bloodGroup: "B+",
  numberOfDonors: 1,
  city: "",
  hospital: "",
  urgencyLevel: "Medium",
  contactNumber: "",
};
