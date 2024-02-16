"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "@/assets/logo-light.png";
import leftAuthIcon from "@/assets/auth-icon-1.png";
import rightAuthIcon from "@/assets/auth-icon-2.png";
import footerIcon from "@/assets/logo-bw.png";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState(""); 
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/dashboard");
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    if (password !== passwordAgain) {
      setError("Passwords do not match");
      return;
    }
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="flex justify-between sm:justify-center 100vh">
      <div className="hidden md:flex items-end justify-center pl-4 100vh">
        <Image src={leftAuthIcon} alt="auth-icon" />
      </div>
      <div
        className="border p-5 rounded-md shadow-lg m-7"
        style={{ width: "500px" }}
      >
        <div className="flex justify-center mb-4">
          <Image src={logoLight} alt="logo" height={200} width={200} />
        </div>
        <p className="text-center text-black mb-4">Forgot Password</p>
        <form
          onSubmit={!successfulCreation ? create : reset}
          className="space-y-4 md:space-y-6"
        >
          {!successfulCreation && (
            <>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please provide your email address"
                  className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center mb-3"
              >
                Send password reset code
              </button>
              {error && <p>{error}</p>}
            </>
          )}
          {successfulCreation && (
            <>
              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="passwordAgain"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  placeholder="Enter your new password again"
                  className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter reset code"
                  className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center mb-3"
              >
                Reset
              </button>
              {error && <p>{error}</p>}
            </>
          )}
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
