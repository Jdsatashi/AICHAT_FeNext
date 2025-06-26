import z from "zod";

export const EmailValidate = z.string().email({ message: "invalid email" });

export const UserCreateValidate = z.object({
  username: z.string().min(1, { message: "username is required" }),
  email: EmailValidate,
  password: z.string().min(1, { message: "password is required" }),
});
