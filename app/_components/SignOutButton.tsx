import { FC } from "react";

import { signOutAction } from "@/app/_lib/actions";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const SignOutButton: FC = () => {
  return (
    <form action={signOutAction}>
      <button className="flex w-full flex-col items-center gap-1 px-4 py-2 text-xs font-semibold text-primary-200 transition-colors hover:bg-primary-700 md:flex-row md:gap-2 md:px-5 md:py-3 md:hover:bg-primary-900 md:hover:text-primary-100">
        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary-600" />
        <span className="text-center text-xs md:text-lg">Sign out</span>
      </button>
    </form>
  );
};

export default SignOutButton;
