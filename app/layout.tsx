import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTrack",
  description: "User Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isSignedIn, user, isLoaded } = useUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header username={"Guest"}/>
          <main className="container">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
