import * as z from "zod"

export const userSignUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
})

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

// export const userSignUpSchema = userSignInSchema.extend({
//   name: z.string().min(3),
// });
