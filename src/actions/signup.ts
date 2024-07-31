"use server"

import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { z } from "zod"

import db from "@/lib/db"
import { userSignUpSchema } from "@/lib/validations/auth"

type FormTypes = z.infer<typeof userSignUpSchema>

export async function signUp(formData: FormTypes) {
  try {
    // Validate and process the data
    const payload = userSignUpSchema.parse(formData)
    const { name, email, password } = payload

    const exists = await db.user.findFirst({ where: { email } })

    if (exists) {
      return {
        ok: false,
        message: "Email is already in use",
        status: 401,
      }
    }

    const hashed_password = await hash(password, 12)

    await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hashed_password,
      },
    })

    return {
      ok: true,
      error: "User is registered",
      status: 200,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: JSON.stringify(error.issues),
        status: 422,
      }
    }

    return {
      ok: false,
      message: "error",
      status: 500,
    }
  }
}
