import { z } from "zod";

export const petReportSchema = z.object({
  id: z.string(),
  reportType: z.enum(["missing", "found"]),
  petName: z.string().optional(),
  petType: z.enum(["dog", "cat", "bird", "rabbit", "other"]),
  breed: z.string().optional(),
  age: z.enum(["puppy-kitten", "young", "adult", "senior", "unknown"]).optional(),
  color: z.string().optional(),
  size: z.enum(["small", "medium", "large", "extra-large"]).optional(),
  location: z.string(),
  dateTime: z.string(),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  contactName: z.string(),
  contactPhone: z.string(),
  contactEmail: z.string().optional(),
  status: z.enum(["active", "reunited"]).default("active"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertPetReportSchema = petReportSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PetReport = z.infer<typeof petReportSchema>;
export type InsertPetReport = z.infer<typeof insertPetReportSchema>;

export const statsSchema = z.object({
  missing: z.number(),
  found: z.number(),
  recent: z.number(),
  reunited: z.number(),
});

export type Stats = z.infer<typeof statsSchema>;
