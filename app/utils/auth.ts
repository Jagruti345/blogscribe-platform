import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { getServerSession, NextAuthOptions } from "next-auth"

import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"


export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // ✅ ADD THIS
      }
      return session;
    },
  },
}


export const getAuthSession = () => getServerSession(authOptions)