import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignedOut,
  RedirectToSignIn,
  ClerkLoaded,
} from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/navbar/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTrack",
  description: "User Management System",
};

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default async function RootLayout({
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
          <ClerkLoaded>
            <Header />
            <main>
              <div>
                <div className="overflow-x-hidden">{children}</div>
              </div>
            </main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
