import z from "zod";

export const registerInputSchema = z.object({
  name: z.string(),
  email: z.email("Invalid email address"),
  userName: z.string().min(3, { message: "Username must be at least 3 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." }),
});
