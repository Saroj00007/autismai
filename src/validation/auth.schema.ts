import { z } from "zod";

export const authSchema = z.object({
  name: z.string().max(20, "The maximum character for name is 20"),
  email: z.email("invalid email address").toLowerCase(),
  password: z.string().min(8, "password must be at least 8 characters long!"),
});
