import { FC } from "react";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

import { ICabin } from "../_types/Cabin";

interface CabinListProps {
  filter: string;
}

const CabinList: FC<CabinListProps> = async ({ filter }) => {
  // unstable_noStore();

  const cabins: ICabin[] = await getCabins();

  if (!cabins.length) return null;

  const displayedCabins = cabins.filter((cabin) => {
    switch (filter) {
      case "small":
        return cabin.maxCapacity <= 3;
      case "medium":
        return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
      case "large":
        return cabin.maxCapacity >= 8;
      default:
        return true;
    }
  });

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.length > 0 ? (
        displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))
      ) : (
        <p className="text-center text-lg">
          No cabins match the selected filter.
        </p>
      )}
    </div>
  );
};

export default CabinList;
