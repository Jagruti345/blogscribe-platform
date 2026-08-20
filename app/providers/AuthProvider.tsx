"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {
  return (
    <SessionProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SessionProvider>
  )
}

export default AuthProvider