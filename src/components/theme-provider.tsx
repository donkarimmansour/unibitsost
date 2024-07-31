"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"

export function ThemeProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>
}
