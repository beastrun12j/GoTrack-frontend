"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
}

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded || password !== passwordAgain) {
      return;
    }

    try {
      const signUpData: SignUpData = {
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        password: password,
      };

      await signUp.create(signUpData);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(err);
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
        // router.push("/");
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
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                value={firstName}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                value={lastName}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                value={email}
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
                value={password}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password_again"
                id="password_again"
                onChange={(e) => setPasswordAgain(e.target.value)}
                placeholder="Enter password again"
                className="bg-white border border-theme text-gray-800 sm:text-sm rounded-sm focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                value={passwordAgain}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
            >
              Continue
            </button>
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
            {/* <div className="flex flex-col justify-center items-center my-2">
              <Image src={footerIcon} alt="Footer Icon" width={150}/>
              <div className="flex justify-between">
                <p className="text-sm">Privacy Policy</p>
                <p className="text-sm">.</p>
                <p className="text-sm">User Notice</p>
              </div>

            </div> */}
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
