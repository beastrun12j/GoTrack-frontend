import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = async ({ username }) => {
  const { userId } = auth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white-700">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg font-bold text-black-900 uppercase">GoTrack</div>
        </Link>
      </div>
      <div className="flex items-center text-black">

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

        {userId && (
          <>

          <Link href="dashboard" className="text-black-900 hover:text-gray-500 mr-4">
            Home
          </Link>

          <Link href="dashboard" className="text-black-900 hover:text-gray-500 mr-4">
            Notifications
          </Link>

          <Link href="profile" className="text-black-900 hover:text-gray-500 mr-4">
            Profile
          </Link>


          </>

        )}

        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>

    </nav>
  );
};

export default Header;
