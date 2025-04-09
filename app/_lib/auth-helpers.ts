import { redirect } from "next/navigation";

import { auth } from "./auth";

export const requireAuth = async () => {
  const session = await auth();

  if (!session?.user || Object.keys(session.user).length === 0) {
    redirect("/login");
  }

  return session;
};
