import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "./utils";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "@/data";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    // strategy: "database",
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  /*
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    verificationTokensTable,
  }),
  */
  providers: [
    CredentialsProvider({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const email = String(credentials.email).trim().toLowerCase();
          const password = String(credentials.password);
          return await authenticateUser(email, password);
        } catch {
          return null; // never throw from authorize
        }
      },
    }),
  ],

  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.avatar = token.avatar as string;
      }

      return session;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.role = (user as any).role;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
