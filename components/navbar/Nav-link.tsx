'use client';
import Link from 'next/link';
import { usePathname } from "next/navigation"
import { ReactNode } from 'react';

interface NavLinkProps {
    href: string;
    children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {

    const pathname = usePathname();

    return (
        <Link href={href} className={pathname.startsWith(href)?`border-b-4 border-b-blue-500 py-4 pb-2`:`border-b-4 border-b-transparent py-4 pb-2`} >{children}</Link>
    );
};

export default NavLink;