"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

import { ICabinFilterOption } from "@/app/_types";

interface ButtonProps {
  filter: ICabinFilterOption;
  handleFilter: (filter: ICabinFilterOption) => void;
  activeFilter: ICabinFilterOption;
  children: ReactNode;
}

// Define the Filter component
const Filter: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter: ICabinFilterOption =
    (searchParams.get("capacity") as ICabinFilterOption) ?? "all";

  const handleFilter = (filter: ICabinFilterOption): void => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filters: ICabinFilterOption[] = ["all", "small", "medium", "large"];

  return (
    <div className="flex border border-primary-800">
      {filters.map((filter) => (
        <Button
          key={filter}
          filter={filter}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {filter === "all"
            ? "All cabins"
            : filter === "small"
              ? `2-3 guests`
              : filter === "medium"
                ? "4-7 guests"
                : "8-12 guests"}
        </Button>
      ))}
    </div>
  );
};

const Button: FC<ButtonProps> = ({
  filter,
  handleFilter,
  activeFilter,
  children,
}) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
