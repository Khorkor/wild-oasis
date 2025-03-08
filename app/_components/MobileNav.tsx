"use client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { XMarkIcon } from "@heroicons/react/24/solid";

const MobileNav = ({
  isOpen,
  setIsOpen,
  session,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  session: Session | null;
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-primary-900 text-primary-100 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary-800 px-6 py-5">
          <Link
            href="/"
            className="text-xl font-semibold"
            onClick={() => setIsOpen(false)}
          >
            The Wild Oasis
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-primary-100">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>

        <ul className="mt-6 flex flex-col space-y-6 px-6 text-lg">
          <li>
            <Link
              href="/cabins"
              className="block"
              onClick={() => setIsOpen(false)}
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="flex items-center gap-2 transition-colors hover:text-accent-400"
              >
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  height={32}
                  width={32}
                  referrerPolicy="no-referrer"
                  alt={session.user.image}
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="transition-colors hover:text-accent-400"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNav;
