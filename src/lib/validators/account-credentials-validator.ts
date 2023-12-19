import { z } from "zod";

// Email and Password Requirements Parameters
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
// Credentials Validation
export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;  

 
