import { auth } from "@/app/_lib/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Area",
};

const Account = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").at(0);
  return (
    <div className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {firstName}
    </div>
  );
};

export default Account;
