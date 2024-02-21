"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useForm, SubmitHandler } from "react-hook-form";
import SignInOAuthButtons from "@/components/auth/OAuthButtons";
import Image from "next/image";
import logoLight from "@/assets/logo-light.png";
import leftAuthIcon from "@/assets/auth-icon-1.png";
import rightAuthIcon from "@/assets/auth-icon-2.png";
import Link from "next/link";

interface SignUpData {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
}

interface SubmissionData {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignUpData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const { isLoaded, signUp, setActive } = useSignUp();

  const submitHandler: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    if (!isLoaded || data.password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const signUpData: SubmissionData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email_address: data.email_address,
        password: data.password,
      };

      await signUp?.create(signUpData);

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });

      reset();
      setError(null);
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex justify-between sm:justify-center">
      <div className="hidden md:flex items-end justify-center pl-4">
        <Image src={leftAuthIcon} alt="auth-icon" />
      </div>
      <div
        className="border p-5 rounded-md shadow-lg mb-5"
        style={{ width: "500px" }}
      >
        <div className="flex justify-center mb-4">
          <Image src={logoLight} alt="logo" height={200} width={200} />
        </div>
        <p className="text-center text-black mb-4">Sign up to continue</p>
        {!pendingVerification && (
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Enter first name"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                aria-invalid={errors.first_name ? "true" : "false"}
                {...register("first_name", {
                  required: "First Name is required.",
                })}
                onChange={() => setError(null)}
              />
              {errors.first_name && (
                <span role="alert" className="text-red-700 text-sm">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter last name"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                aria-invalid={errors.last_name ? "true" : "false"}
                {...register("last_name", {
                  required: "Last Name is required.",
                })}
                onChange={() => setError(null)}
              />
              {errors.last_name && (
                <span role="alert" className="text-red-700 text-sm">
                  {errors.last_name.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                aria-invalid={errors.email_address ? "true" : "false"}
                {...register("email_address", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                onChange={() => setError(null)}
              />
              {errors.email_address && (
                <span role="alert" className="text-red-700 text-sm">
                  {errors.email_address.message}
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
              {errors.password && (
                <span role="alert" className="text-red-700 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                aria-invalid={errors.confirm_password ? "true" : "false"}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (val: string) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                onChange={() => setError(null)}
              />
              {errors.confirm_password && (
                <span role="alert" className="text-red-700 text-sm">
                  {errors.confirm_password.message}
                </span>
              )}
              <input
                type="checkbox"
                onClick={() => setShowPassword(!showPassword)}
              />
              <span style={{ fontSize: "12px" }} className="ml-2">
                Show Password
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            {error && (
              <div role="alert" className="text-red-700 text-sm text-center">
                {error}
              </div>
            )}
            <div className="flex justify-start items-center">
              <p style={{ fontSize: "12px" }}>
                Already have an account? &nbsp;
                <Link className="hover:underline text-theme" href="/auth/login">
                  Login Here
                </Link>
              </p>
            </div>
            <p className="text-center text-gray-600 mb-4">Or Continue with:</p>
            <SignInOAuthButtons />
          </form>
        )}
        {pendingVerification && (
          <div>
            <form onSubmit={onPressVerify} className="space-y-4 md:space-y-6">
              <input
                value={code}
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="Enter Verification Code..."
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="submit"
                className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="hidden md:flex items-start justify-center pr-4">
        <Image src={rightAuthIcon} alt="auth-icon" />
      </div>
    </div>
  );
};

export default RegisterPage;
