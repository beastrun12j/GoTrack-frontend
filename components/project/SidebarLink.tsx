"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function SidebarLink({
  href,
  children,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      passHref
      className={`${className ? className : ""} ${
        pathname.startsWith(href) ? "text-blue-600 bg-[#ebecf0] rounded-sm" : "text-[#172b4d] rounded-sm"
      }`}
    >
      {children}
    </Link>
  );
}
