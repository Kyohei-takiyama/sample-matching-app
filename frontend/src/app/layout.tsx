import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample Matching",
  description:
    "副業を探すならSample Matching。あなたのスキルに合った案件を探しましょう。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
