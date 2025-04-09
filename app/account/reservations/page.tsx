import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import ReservationCard from "@/app/_components/ReservationCard";
import { requireAuth } from "@/app/_lib/auth-helpers";
import { getBookings } from "@/app/_lib/data-service";
import { IBooking } from "@/app/_types";

export const metadata: Metadata = {
  title: "Reservations",
};

const Page = async () => {
  const session = await requireAuth();
  const guestId = session.user.guestId;

  if (!guestId) {
    redirect("/error");
  }

  const bookings: IBooking[] = await getBookings(guestId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="text-accent-500 underline" href="/cabins">
            Luxury cabins &rarr;
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
};

export default Page;
