import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import NavLink from "./Nav-link";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = async ({ username }) => {
  const { userId } = auth();

  

  return (
    <nav className="flex items-center justify-between px-6 shadow-md bg-white-700">

      <div className="left-side flex items-center">

        <Link href="/">
          <div className="text-lg font-bold text-black-900 uppercase mx-3">GoTrack</div>
        </Link>

        {userId && (
          <>

          <NavLink href="/dashboard">
            <div className="text-black-900 hover:text-gray-500 mx-3 text-center">Home</div>
          </NavLink>

          <NavLink href="/notifications">
            <div className="text-black-900 hover:text-gray-500 mx-3 text-center">Notifications</div>
          </NavLink>

          {/* <Link href="/dashboard" className="text-black-900 hover:text-gray-500 mx-3">
            Notifications
          </Link> */}

          </>

        )}

      </div>

      <div className="right-side flex items-center text-black">

        {!userId && (
          <>
            <Link
              href="sign-in"
              className="text-black-900 hover:text-gray-500 mr-4"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="text-black-900 hover:text-gray-500 mr-4"
            >
              Sign Up
            </Link>
          </>

        )}

        { userId && (
          
          <Link href="profile" className="text-black-900 hover:text-gray-500 mr-4">
            Profile
          </Link>

        )}

        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>

    </nav>
  );
};

export default Header;
