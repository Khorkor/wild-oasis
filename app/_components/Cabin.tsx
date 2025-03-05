import Image from "next/image";
import { FC } from "react";

import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import type { ICabin } from "@/app/_types";

interface CabinProps {
  cabin: ICabin;
}

const Cabin: FC<CabinProps> = ({ cabin }) => {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="mb-12 grid grid-cols-1 gap-8 border border-primary-800 px-4 py-3 sm:mb-16 sm:grid-cols-[3fr_4fr] sm:gap-16 sm:px-8 lg:mb-24 lg:gap-20 lg:px-10">
      <div className="relative h-64 w-full sm:h-auto sm:-translate-x-3 sm:scale-[1.15]">
        <Image
          src={image || ""}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="relative">
        <h3 className="mb-4 bg-primary-950 p-4 text-4xl font-black text-accent-100 sm:mb-5 sm:w-[150%] sm:translate-x-[-254px] sm:p-6 sm:pb-1 sm:text-5xl lg:text-7xl">
          Cabin {name}
        </h3>

        <p className="mb-6 text-base text-primary-300 sm:mb-8 sm:text-lg lg:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-5 flex flex-col gap-3 sm:mb-7 sm:gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;
