"use client";

import { differenceInDays } from "date-fns";

import { useReservation } from "@/app/_context/ReservationContext";
import { createBooking } from "@/app/_lib/data-service";
import { IBooking, ICabin } from "@/app/_types";

import SubmitButton from "./SubmitButton";

interface IReservationFormProps {
  cabin: ICabin;
}

function ReservationForm({ cabin }: IReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  // Add safety check for range
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

    // Collecting form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const numGuests = formData.get("numGuests")?.toString();
    const observations = formData.get("observations")?.toString();

    // Add any other form values you need to include in the bookingData
    // const newBooking: IBooking = {
    //   ...bookingData,
    //   numGuests: numGuests ? parseInt(numGuests) : undefined,
    //   observations,
    // };

    // await createBooking(newBooking);
    // resetRange();
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between bg-primary-800 px-4 py-2 text-sm text-primary-300 sm:px-8 sm:text-base">
        <p>Logged in as</p>
        {/* 
        <div className="flex items-center gap-4">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.countryFlag}
            alt={user.fullName}
          />
          <p>{user.fullName}</p>
        </div> */}
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 bg-primary-900 px-4 py-4 text-sm sm:gap-4 sm:px-8 sm:py-6 sm:text-base"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-primary-200">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 sm:px-4 sm:py-2"
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

        <div className="space-y-2">
          <label htmlFor="observations" className="text-primary-200">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-3 py-1 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 sm:px-4 sm:py-2"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          {!(startDate && endDate) ? (
            <p className="text-xs text-primary-300 sm:text-sm">
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
