import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaGithub } from "react-icons/fa";
import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInOAuthButtons() {
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
