import { z } from "zod";

export const courseSchema = z.object({
  name: z
    .string()
    .min(2, "Course name must be at least 2 characters long"),

  code: z
    .string()
    .min(1, "Course code is required"),

  duration: z
    .string()
    .min(1, "Duration is required"),

  fee: z
    .number()
    .positive("Fee must be greater than 0"),
});