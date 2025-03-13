"use client";

import { useEffect, useState } from "react";

import Logo from "@/app/_components/Logo";
import MobileNav from "@/app/_components/MobileNav";
import Navigation from "@/app/_components/Navigation";
import { Session } from "@/app/_lib/auth";
import { Bars3Icon } from "@heroicons/react/24/solid";

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Navigation session={session} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="z-50 flex text-primary-100 md:hidden"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} session={session} />
    </header>
  );
};

export default Header;
