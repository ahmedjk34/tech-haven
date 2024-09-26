import type { Metadata } from "next";
import "../styles/pages/global-rules.scss";

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
      <body>{children}</body>
    </html>
  );
}
