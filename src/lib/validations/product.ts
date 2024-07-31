import * as z from "zod"

export const productRouteSchema = z.object({
  params: z.object({
    producId: z.string(),
  }),
})

const MAX_FILE_SIZE = 500000; const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/webp", ];


export const productCreateSchema = z.object({
  title: z.string().min(3),
  price: z.string(),
  description: z.string(),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList),
  category: z.string() //z.enum(["women", "men", "kids"]),
})

export const productUpdateSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList),
  category: z.string() //z.enum(["women", "men", "kids"]),
})
