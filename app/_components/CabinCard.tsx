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
    <div className="flex flex-col border border-primary-800 sm:flex-row">
      {/* Mobile Image */}
      <div className="relative w-full flex-1 sm:hidden">
        <Image
          src={image!}
          layout="responsive"
          width={600}
          height={400}
          alt={`Cabin ${name}`}
          className="h-full w-full border-b border-primary-800 object-cover sm:border-b-0 sm:border-r"
        />
      </div>

      {/* Desktop Image */}
      <div className="relative w-full flex-1 sm:block sm:w-auto">
        <Image
          src={image!}
          fill
          alt={`Cabin ${name}`}
          className="border-r border-primary-800 object-cover"
        />
      </div>

      <div className="flex-grow p-4 sm:p-7">
        <div className="bg-primary-950 px-7 pb-4 pt-5">
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
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
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

        <div className="bg-primary-950 text-right">
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
