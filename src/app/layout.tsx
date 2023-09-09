import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cronfree Time Scheduler",
  description:
    "Cronfree Time Scheduler creates multiple reoccurring tasks with no-code automation. Schedule them at varied timezones and intervals, spanning from minutes to months.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// https://github.com/vercel/next.js/issues/49373#issuecomment-1565502698
export const dynamic = "force-dynamic";
