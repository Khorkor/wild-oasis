import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Area",
};

const Account = () => {
  return (
    <div className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, Khor Accont page
    </div>
  );
};

export default Account;
