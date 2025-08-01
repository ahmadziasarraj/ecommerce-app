import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})