import { z } from "zod";

export const companySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters long"),
    location: z.string().min(1, "Location must be at be provided"),
    about: z.string().min(10, "Please provide a brief description about your company"),
    logo: z.string().min(1, "Please provide a logo"),
    website: z.string().optional(),
    xAccount: z.string().optional(),
});