import Image from "next/image";
import { FC } from "react";

const SignInButton: FC = () => {
  return (
    <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height={24}
        width={24}
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default SignInButton;
