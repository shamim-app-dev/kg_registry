import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { admins } from "@/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const admin = await db
          .select()
          .from(admins)
          .where(eq(admins.email, credentials.email))
          .limit(1);

        if (admin.length === 0) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin[0].password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin[0].id.toString(),
          name: "Super Admin",
          email: admin[0].email,
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Add role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role; // Add role to session
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
