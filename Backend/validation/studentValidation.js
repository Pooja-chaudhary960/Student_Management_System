import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(2, "Address is required"),
  phoneNo: z.string().length(10, "Phone number must be 10 digits"),
  gender: z.string().min(1, "Gender is required"),
  teachers: z.array(z.string()).min(1, "Select at least one teacher"),
  courses: z.array(z.string()).min(1, "Select at least one course"),
});