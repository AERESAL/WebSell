import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebSell | Websites that convert",
  description:
    "WebSell builds high-converting business websites with transparent pricing and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
