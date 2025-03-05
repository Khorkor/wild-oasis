import { Metadata } from "next";
import Link from "next/link";

import ReservationCard from "@/app/_components/ReservationCard";
import { IBooking } from "@/app/_types";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function Page() {
  const bookings: IBooking[] = [];

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
