"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import SignInOAuthButtons from "@/components/auth/OAuthButtons";
import Image from "next/image";
import logoLight from "@/assets/logo-light.png";
import leftAuthIcon from "@/assets/auth-icon-1.png";
import rightAuthIcon from "@/assets/auth-icon-2.png";
import footerIcon from "@/assets/logo-bw.png";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginData {
  identifier: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState<string | null>(null);

  const submitHandler: SubmitHandler<LoginData> = async (data: any) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const loginData: LoginData = {
        identifier: data.identifier,
        password: data.password,
      };

      const completeSignIn = await signIn.create(loginData);

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        reset();
        setError(null);
      }
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
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
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-4 md:space-y-6"
        >
          <div>
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              aria-invalid={errors.identifier ? "true" : "false"}
              {...register("identifier", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please enter a valid email",
                },
              })}
              onChange={() => setError(null)}
            />
            {errors.identifier && (
              <span role="alert" className="text-red-700 text-sm">
                {errors.identifier.message}
              </span>
            )}
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", { required: "Password is required" })}
              onChange={() => setError(null)}
            />
            {/* <span
              style={{
                position: "relative",
                cursor: "pointer",
                top: "-30px",
                left: "430px",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? <FaEyeSlash /> : <FaEye />}</span> */}
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            <span style={{ fontSize: "12px" }} className="ml-2">
              Show Password
            </span>
          </div>
          {errors.password && (
            <span role="alert" className="text-red-700 text-sm">
              {errors.password.message}
            </span>
          )}
          <button
            type="submit"
            className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center mb-3"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
          {error && (
            <div role="alert" className="text-red-700 text-sm text-center">
              {error}
            </div>
          )}
          <div className="flex justify-center items-center">
            <p style={{ fontSize: "12px" }}>
              <Link
                className="hover:underline text-theme"
                href="/auth/register"
              >
                Create an account
              </Link>
            </p>
            <p style={{ fontSize: "12px" }}>&nbsp; &middot; &nbsp;</p>
            <p style={{ fontSize: "12px" }}>
              <Link
                className="hover:underline text-theme"
                href="/auth/forgot-password"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
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
