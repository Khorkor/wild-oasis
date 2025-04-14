import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { UsersIcon } from "@heroicons/react/24/solid";

import { ICabin } from "../_types/Cabin";

interface CabinCardProps {
  cabin: ICabin;
}

const CabinCard: FC<CabinCardProps> = ({ cabin }) => {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col border border-primary-800">
      {/* Image - same for mobile and desktop, just taller on desktop */}
      <div className="relative h-[250px] w-full sm:h-[350px]">
        <Image
          src={image!}
          fill
          alt={`Cabin ${name}`}
          className="border-b border-primary-800 object-cover"
        />
      </div>

      {/* Information */}
      <div className="flex-grow px-4 py-1">
        <div className="bg-primary-950 pb-3 pt-5">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline gap-3">
            {discount! > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice! - discount!}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="my-2 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="px-6 py-4 transition-all hover:bg-accent-600 hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CabinCard;
