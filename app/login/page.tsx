"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SignInOAuthButtons from "@/components/auth/OAuthButtons";
import Image from "next/image";
import logoLight from "@/assets/logo-light.png";
import leftAuthIcon from "@/assets/auth-icon-1.png";
import rightAuthIcon from "@/assets/auth-icon-2.png";
import footerIcon from "@/assets/logo-bw.png";

interface LoginData {
  identifier: string;
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const loginData: LoginData = {
        identifier: email,
        password: password,
      };

      const completeSignIn = await signIn.create(loginData);

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex justify-between sm:justify-center">
      <div className="hidden md:flex items-end justify-center pl-4">
        <Image src={leftAuthIcon} alt="auth-icon" />
      </div>
      <div
        className="border p-5 rounded-md shadow-lg m-7"
        style={{ width: "500px" }}
      >
        <div className="flex justify-center mb-4">
          <Image src={logoLight} alt="logo" height={200} width={200} />
        </div>
        <p className="text-center text-black mb-4">Login to continue</p>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
          >
            Continue
          </button>
          <p className="text-center text-gray-600 mb-4">Or Continue with:</p>
          <SignInOAuthButtons />
          <div className="flex flex-col justify-center items-center my-2">
            <div className="mb-3">
              <Image src={footerIcon} alt="Footer Icon" width={150} />
            </div>
            <div className="flex justify-between">
              <a href="/">
                <p style={{ fontSize: "12px" }} className="hover:underline">
                  Privacy Policy
                </p>
              </a>
              <p style={{ fontSize: "12px" }}>&nbsp; &middot; &nbsp;</p>
              <a href="/">
                <p style={{ fontSize: "12px" }} className="hover:underline">
                  User Notice
                </p>
              </a>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden md:flex items-start justify-center pr-4">
        <Image src={rightAuthIcon} alt="auth-icon" />
      </div>
    </div>
  );
}
