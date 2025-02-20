import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Clone Chat',
  description: 'Process, translate, and summarize text using Chrome AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}