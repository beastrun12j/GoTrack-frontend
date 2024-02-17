import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/navbar/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTrack",
  description: "User Management System",
};

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <html lang="en">
        <body className={inter.className}>
          <Header username={"Guest"} />
          <main>
            <div className="min-h-screen">
              <div className="mt-10">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
