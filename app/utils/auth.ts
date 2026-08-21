import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession, NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Please enter both email and password.");
      }

      const normalizedEmail = credentials.email.toLowerCase().trim();

      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!user) {
        throw new Error("No account found with this email address.");
      }

      if (!user.password) {
        throw new Error(
          "This account was created using a social sign-in (Google/GitHub/Facebook). Please sign in using your social account."
        );
      }

      const isValidPassword = await bcrypt.compare(credentials.password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid email or password.");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
    },
  }),
];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

if (process.env.FACEBOOK_ID && process.env.FACEBOOK_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers,
  secret: process.env.NEXTAUTH_SECRET || "default_nextauth_secret_for_blogscribe",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);