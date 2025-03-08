"use client";

import { differenceInDays } from "date-fns";
import { Session } from "next-auth";
import Image from "next/image";

import { useReservation } from "@/app/_context/ReservationContext";
import { createBooking } from "@/app/_lib/data-service";
import { IBooking, ICabin } from "@/app/_types";

import SubmitButton from "./SubmitButton";

interface IReservationFormProps {
  cabin: ICabin;
  user: Session | null;
}

function ReservationForm({ cabin, user }: IReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate: Date | undefined = range?.from ?? undefined;
  const endDate: Date | undefined = range?.to ?? undefined;

  const numNights: number =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice: number = numNights * (regularPrice - discount);

  const bookingData: IBooking = {
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // const createBookingWithData = createBooking.bind(null, bookingData);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // // Collecting form data
    // const form = e.target as HTMLFormElement;
    // const formData = new FormData(form);
    // const numGuests = formData.get("numGuests")?.toString();
    // const observations = formData.get("observations")?.toString();

    // // Add any other form values you need to include in the bookingData
    // const newBooking: IBooking = {
    //   ...bookingData,
    //   numGuests: numGuests ? parseInt(numGuests) : undefined,
    //   observations,
    // };

    // await createBooking(newBooking);
    resetRange();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-primary-800 px-2 py-1 text-xs text-primary-300 sm:px-4 sm:py-2 sm:text-sm md:text-base">
        <p>Logged in as</p>

        {user && (
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src={user.user?.image || "/default.png"}
              height={32}
              width={32}
              referrerPolicy="no-referrer"
              alt={user.user?.name || "Guest"}
            />
            <p>{user.user?.name}</p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-grow flex-col justify-between gap-2 bg-primary-900 px-2 py-2 text-xs sm:gap-3 sm:px-4 sm:py-4 sm:text-sm md:gap-4 md:px-8 md:py-6 md:text-base"
      >
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="numGuests" className="text-primary-200">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-2 py-0.5 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 sm:px-3 sm:py-1 md:px-4 md:py-2"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-grow space-y-1 sm:space-y-2">
          <label htmlFor="observations" className="text-primary-200">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className={`w-full rounded-sm bg-primary-200 px-2 py-0.5 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 sm:px-3 sm:py-1 md:px-4 md:py-2 ${
              startDate && endDate ? "h-36 md:h-36" : "h-48"
            }`}
          />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
          {!(startDate && endDate) ? (
            <p className="text-[10px] text-primary-300 sm:text-xs md:text-sm">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
