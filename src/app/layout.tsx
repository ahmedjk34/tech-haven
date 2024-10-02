import type { Metadata } from "next";
import "../styles/pages/global-rules.scss";
import Nav from "@/components/Nav/Nav";
import CartProvider from "@/components/CartProvider/CartProvider";

export const metadata: Metadata = {
  title: "Tech Haven - Your Ultimate PC Parts Destination",
  description:
    "Explore a vast selection of PC components, compare products, and build your custom rig at Tech Haven. Your one-stop shop for all things tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <CartProvider>
        <body>
          <Nav />
          {children}
        </body>
      </CartProvider>
    </html>
  );
}
