import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import db from "@/lib/db"
import { userNameSchema, userRouteSchema } from "@/lib/validations/user"

export async function PUT(
  req: Request,
  context: z.infer<typeof userRouteSchema>
) {
  try {
    const { params } = userRouteSchema.parse(context)


    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)

    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userNameSchema.parse(body)

    // Update the user.
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: payload.name,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
