import { z } from "zod";
const signUpSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(5, "First name is required and should be 5-20 characters")
      .max(20),
    lastname: z
      .string()
      .trim()
      .min(5, "Last name is required and should be 5-20 characters")
      .max(20),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" })
      .max(20)
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message:
          "Password should contain at least one special character (!@#$%^&*)"
      }),
    confirmpassword: z.string()
  })
  .refine((input) => input.password === input.confirmpassword, {
    message: "Passwords do not match.",
    path: ["confirmpassword"]
  });
type TSignUpTupe = z.infer<typeof signUpSchema>;
export {type TSignUpTupe, signUpSchema };