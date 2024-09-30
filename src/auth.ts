import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import User from "./models/userModel";
import connectDB from "./lib/connectDB";
import { UserType } from "./util/Types";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined; //this is the name attribute in inpit
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectDB();

        const user: UserType | null = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }
        let userData = {
          id: user._id.toString(),
          username: user.username,
          cart: user.cart,
          wishlist: user.wishlist,
        };
        return userData;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.username = user.username;
        token.wishlist = user.wishlist;
        token.cart = user.cart;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.wishlist = token.wishlist;
      session.user.cart = token.cart;
      return session;
    },
  },
  pages: {
    //here we add those if we don't want to use the default auth.js pages
    signIn: "/login",
  },
});
