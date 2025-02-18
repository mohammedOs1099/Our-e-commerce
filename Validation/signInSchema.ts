import { z } from "zod";
const signInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .max(20)
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message:
        "Password should contain at least one special character (!@#$%^&*)"
    })
});

type TSignInInputs = z.infer<typeof signInSchema>;
export { signInSchema, type TSignInInputs };