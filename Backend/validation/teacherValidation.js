import { z } from "zod";

export const teacherSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long"),

  email: z
    .string()
    .email("Invalid email address"),

  address: z
    .string()
    .min(2, "Address must be at least 2 characters long"),

  phoneNo: z
    .string()
    .length(10, "Phone number must be 10 digits"),

  qualification: z
    .string()
    .min(1, "Qualification is required"),

  courses: z
    .array(z.string())
    .min(1, "Select at least one course"),
});