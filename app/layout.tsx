import type { FC, ReactNode } from "react";
import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "The Wild Oasis",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <header>
          <Logo />
          <Navigation />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
