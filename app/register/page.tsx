"use client";

import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaGithub } from "react-icons/fa";
import Image from "next/image";
import logoLight from "@/assets/logo-light.png";

interface SignUpData {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
}

function SignInOAuthButtons() {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };
  return (
    <div>
      <button
        onClick={() => signInWith("oauth_google")}
        className="w-full mb-3 text-gray-800 font-medium text-center rounded-sm px-5 py-1.5 text-base border-2 border-theme"
      >
        <div className="flex items-center justify-center">
          <FcGoogle className="m-2" size={25} />
          <p>Google</p>
        </div>
      </button>
      <button
        onClick={() => signInWith("oauth_microsoft")}
        className="w-full mb-3 text-gray-800  font-medium rounded-sm px-5 py-1 text-base text-center border-2 border-theme"
      >
        <div className="flex items-center justify-center">
          {/* <FaMicrosoft className="m-2" /> */}
          <Image
            src="https://parspng.com/wp-content/uploads/2022/06/microsoftpng.parspng.com-2.png"
            alt="..."
            width={60}
            height={60}
            unoptimized
          />
          <p>Microsoft</p>
        </div>
      </button>
      <button
        onClick={() => signInWith("oauth_github")}
        className="w-full mb-3 text-gray-800 font-medium rounded-sm text-base px-5 py-1.5 text-center border-2 border-theme"
      >
        <div className="flex items-center justify-center">
          <FaGithub className="m-2" size={25} />
          <p>Github</p>
        </div>
      </button>
    </div>
  );
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
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div
      className="border p-5 rounded-sm shadow-lg mb-5"
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
          <div>
            <input
              type="password"
              name="password_again"
              id="password_again"
              onChange={(e) => setPasswordAgain(e.target.value)}
              placeholder="Enter password again"
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
        </form>
      )}
      {pendingVerification && (
        <div>
          <form onSubmit={onPressVerify} className="space-y-4 md:space-y-6">
            <input
              value={code}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Verification Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
