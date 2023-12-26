import { z } from "zod";

// Email and Password Requirements Parameters
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least 1 capital letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least 1 number",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: "Password must contain at least 1 special character",
    }),
    // confirmPassword: z.string(), Confirm Password
});
// Credentials Validation
export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
