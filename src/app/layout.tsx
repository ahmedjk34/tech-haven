import type { Metadata } from "next";
import "../styles/pages/global-rules.scss";
import Nav from "@/components/Nav/Nav";
import CartProvider from "@/components/CartProvider/CartProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import UserModal from "@/components/UserModal/UserModal";

export const metadata: Metadata = {
  title: "Tech Haven - Your Ultimate PC Parts Destination",
  description:
    "Explore a vast selection of PC components, compare products, and build your custom rig at Tech Haven. Your one-stop shop for all things tech.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <CartProvider>
        <body>
          <Nav session={session} />
          {children}
          <SessionProvider session={session}>
            <UserModal />
          </SessionProvider>
        </body>
      </CartProvider>
    </html>
  );
}
