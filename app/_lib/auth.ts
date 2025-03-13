// auth.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { createGuest, getGuest } from "./data-service";

declare module "next-auth" {
  interface Session {
    user: {
      guestId: number;
      email: string;
      name: string;
      image: string;
    };
  }
}

export type Session = import("next-auth").Session;

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user.email || !user.name) {
          throw new Error("Invalid user data from provider");
        }

        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    async session({ session }) {
      if (!session.user?.email) {
        throw new Error("No email in session");
      }

      const guest = await getGuest(session.user.email);
      if (!guest) {
        throw new Error("Guest not found");
      }

      return {
        ...session,
        user: {
          ...session.user,
          guestId: guest.id,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
