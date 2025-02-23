import { FC } from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const SignOutButton: FC = () => {
  return (
    <button className="flex w-full items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100">
      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
};

export default SignOutButton;
