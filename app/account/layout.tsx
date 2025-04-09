import { ReactNode } from "react";

import SideNavigation from "../_components/SideNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="block h-full md:grid md:grid-cols-[16rem_1fr] md:gap-12">
      <SideNavigation />
      <main className="py-1 pb-20 md:pb-1">{children}</main>
    </div>
  );
}
