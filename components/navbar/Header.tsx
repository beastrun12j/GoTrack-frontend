import Link from "next/link";
import { UserButton, auth } from "@clerk/nextjs";
import NavLink from "./Nav-link";
import logoLight from '@/assets/logo-light.png'
import Image from "next/image";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"


interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = async ({ username }) => {
  const { userId } = auth();

  return (
    <nav className="flex items-center justify-between px-6 shadow-md bg-white-700">

      <div className="hidden md:left-side md:flex md:items-center">

        <Link href="/">
          <div className="text-lg font-bold text-black-900 uppercase mx-3 border-b-4 border-b-transparent py-4 pb-2">
            <Image src={logoLight} alt="logo" width={120} height={120} />
          </div>
        </Link>

        {userId && (
          <>

          <NavLink href="/dashboard">
            <div className="text-black-900 hover:text-blue-600 mx-3 text-center">Home</div>
          </NavLink>

          <NavLink href="/notifications">
            <div className="text-black-900 hover:text-blue-600 mx-3 text-center">Notifications</div>
          </NavLink>

          </>

        )}

      </div>

      <div className="md:hidden left flex items-center ">
      
        <Sheet>
          <SheetTrigger><HiMiniBars3CenterLeft color="gray" size={25}/></SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              
              <div className="grid grid-cols-1 gap-0">

                <div className="my-2">
                  <NavLink href="/dashboard">
                    <SheetClose><div className="text-black-900 hover:text-blue-600 mx-3 text-center">Home</div></SheetClose>
                  </NavLink>
                </div>

                <div className="my-2">
                  <NavLink href="/notifications">
                  <SheetClose><div className="text-black-900 hover:text-blue-600 mx-3 text-center">Notifications</div></SheetClose>
                  </NavLink>
                </div>

              </div>
              
            </SheetHeader>
          </SheetContent>
        </Sheet>
        
      </div>

      <div className="md:hidden middle flex items-center">

        <Link href="/">
          <div className="text-lg font-bold text-black-900 uppercase mx-3 border-b-4 border-b-transparent py-4 pb-2">
            <Image src={logoLight} alt="logo" width={120} height={120} />
          </div>
        </Link>
      </div>

      <div className="right-side flex items-center text-black">

        {!userId && (
          <>
            <Link
              href="sign-in"
              className="text-black-900 hover:text-blue-600 mr-4"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="text-black-900 hover:text-blue-600 mr-4"
            >
              Sign Up
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
