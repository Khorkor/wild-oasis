"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden border-r border-primary-900 md:block">
        <ul className="flex h-full flex-col gap-2 text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`flex items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 ${
                  pathname === link.href ? "bg-primary-900" : ""
                }`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 block border-t border-primary-900 bg-primary-800 md:hidden">
        <ul className="flex w-full justify-evenly text-xs md:text-lg">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`flex-1 transition-colors ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
            >
              <Link
                className="flex flex-col items-center justify-center gap-1 px-4 py-2 font-semibold text-primary-200 transition-colors md:flex-row md:gap-2 md:px-5 md:py-3 md:hover:bg-primary-900 md:hover:text-primary-100"
                href={link.href}
              >
                {link.icon}
                <span className="text-center text-xs md:text-lg">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
          <li className="flex-1">
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideNavigation;
