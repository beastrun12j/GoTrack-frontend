"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import NavLink from "./Nav-link";
import logoLight from "@/assets/logo-light.png";
import Image from "next/image";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { get } from "http";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export default function Header() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 shadow-md bg-white-700">
      <div className="hidden md:left-side md:flex md:items-center">
        <Link href="/">
          <div className="text-lg font-bold text-black-900 uppercase mx-3 border-b-4 border-b-transparent py-4 pb-2">
            <Image src={logoLight} alt="logo" width={120} height={120} />
          </div>
        </Link>

        {user && (
          <>
            <NavLink href="/dashboard">
              <div className="text-black-900 hover:text-blue-600 mx-3 text-center">
                Home
              </div>
            </NavLink>

            <NavLink href="/notifications">
              <div className="text-black-900 hover:text-blue-600 mx-3 text-center">
                Notifications
              </div>
            </NavLink>
          </>
        )}
      </div>

      <div className="md:hidden left flex items-center ">
        <Sheet>
          <SheetTrigger>
            <HiMiniBars3CenterLeft color="gray" size={25} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="grid grid-cols-1 gap-0">
                <div className="my-2">
                  <NavLink href="/dashboard">
                    <SheetClose>
                      <div className="text-black-900 hover:text-blue-600 mx-3 text-center">
                        Home
                      </div>
                    </SheetClose>
                  </NavLink>
                </div>

                <div className="my-2">
                  <NavLink href="/notifications">
                    <SheetClose>
                      <div className="text-black-900 hover:text-blue-600 mx-3 text-center">
                        Notifications
                      </div>
                    </SheetClose>
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
        {!user && (
          <>
            <button className="text-white bg-theme hover:bg-blue-700 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
              <Link href="/auth/login">Login</Link>
            </button>
          </>
        )}

        <div className="ml-auto">
          <UserButton afterSignOutUrl="/">
            <UserButton.UserProfileLink
              label="Profile Page"
              url={"/profile/" + user?.id}
              labelIcon={<DotIcon />}
            />
          </UserButton>
        </div>
      </div>
    </nav>
  );
}
