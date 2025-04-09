"use client";

import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { IBooking } from "@/app/_types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

interface IReservationCardProps {
  booking: IBooking;
}

const ReservationCard: FC<IReservationCardProps> = ({ booking }) => {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins,
  } = booking;

  const { name = "Unknown Cabin", image = "" } = cabins || {};
  const imageUrl = image || "/default-cabin.jpg";

  const validStartDate = startDate ? new Date(startDate) : null;
  const validEndDate = endDate ? new Date(endDate) : null;
  const validCreatedAt = created_at ? new Date(created_at) : null;

  const isReservationPast = validStartDate ? isPast(validStartDate) : false;

  return (
    <div className="flex flex-col border border-primary-800 sm:flex-row">
      <div className="relative aspect-square sm:h-48 sm:w-48 sm:flex-shrink-0">
        <Image
          src={imageUrl}
          alt={`Cabin ${name}`}
          fill
          className="border-b border-primary-800 object-cover sm:border-b-0 sm:border-r"
        />
      </div>
      <div className="flex flex-grow flex-col">
        <div className="px-2 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">
                {numNights ?? "N/A"} nights in Cabin {name}
              </h3>
              <p className="mt-1 text-sm text-primary-300 sm:text-xl">
                {validStartDate
                  ? format(validStartDate, "EEE, MMM dd yyyy")
                  : "N/A"}
                {validStartDate && (
                  <span className="text-xs sm:text-lg">
                    (
                    {isToday(validStartDate)
                      ? "Today"
                      : formatDistanceFromNow(startDate!)}
                    )
                  </span>
                )}
                &mdash;
                {validEndDate
                  ? format(validEndDate, "EEE, MMM dd yyyy")
                  : "N/A"}
              </p>
            </div>
            <div className="flex-shrink-0">
              {isReservationPast ? (
                <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200 sm:text-base">
                  past
                </span>
              ) : (
                <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200 sm:text-base">
                  upcoming
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-auto px-2 pb-3 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-lg font-semibold text-accent-400 sm:text-xl">
              ${totalPrice ?? "N/A"}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-base text-primary-300 sm:text-lg">
              {numGuests ?? "N/A"} guest{numGuests !== 1 ? "s" : ""}
            </p>
            <p className="mt-1 w-full text-xs text-primary-400 sm:ml-auto sm:mt-0 sm:w-auto sm:text-sm">
              Booked{" "}
              {validCreatedAt
                ? format(validCreatedAt, "EEE, MMM dd yyyy, p")
                : "N/A"}
            </p>
          </div>
        </div>
        {/* --- Action Buttons (MOBILE ONLY) --- */}
        {!isReservationPast && (
          <div className="border-t border-primary-800 pb-3 pt-3 sm:hidden">
            <div className="flex items-center justify-center">
              <Link
                href={`/account/reservations/edit/${id}`}
                className="group flex flex-grow items-center gap-2 px-2 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
              >
                <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
                <span className="mt-1">Edit</span>
              </Link>

              <DeleteReservation bookingId={id!} />
            </div>
          </div>
        )}
      </div>
      {/* End Main Content Section */}
      {/* --- Action Buttons Column (DESKTOP ONLY) --- */}
      {!isReservationPast && (
        <div className="hidden flex-col border-t border-primary-800 sm:flex sm:border-l sm:border-t-0">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex flex-grow items-center justify-center gap-2 border-b border-primary-800 px-3 text-center text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation bookingId={id!} />
        </div>
      )}
    </div> // End Card Div
  );
};

export default ReservationCard;
