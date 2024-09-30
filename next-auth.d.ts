// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // Import JWT type

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      wishlist: any[]; // Define proper type if known
      cart: any[]; // Define proper type if known
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    wishlist: any[]; // Define proper type if known
    cart: any[]; // Define proper type if known
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    wishlist: any[]; // Define proper type if known
    cart: any[]; // Define proper type if known
  }
}
