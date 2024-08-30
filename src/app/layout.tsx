import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "styles/globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Images",
  description: "Upload and Fave cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><AntdRegistry>{children}</AntdRegistry></body>
    </html>
  );
}
