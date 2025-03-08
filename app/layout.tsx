import type { FC, ReactNode } from "react";
import type { Metadata } from "next";
import "@/_styles/globals.css";

import { Session } from "next-auth";
import { Josefin_Sans } from "next/font/google";

import { ReservationProvider } from "@/app/_context/ReservationContext";
import { auth } from "@/app/_lib/auth";

import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const session: Session | null = await auth();
  console.log(session);
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header session={session} />
        <div className="grid flex-1 px-2 py-12 sm:px-8">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
