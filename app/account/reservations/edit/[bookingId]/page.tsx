import { notFound } from "next/navigation";

import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { IBooking, ICabin } from "@/app/_types";

interface PageProps {
  params: {
    bookingId: number;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { bookingId } = params;
  const booking: IBooking | null = await getBooking(bookingId!);
  if (!booking) {
    return notFound();
  }

  const cabin: ICabin | null = await getCabin(booking.cabinId!);
  if (!cabin) {
    return notFound();
  }

  const { numGuests, observations } = booking;
  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="flex flex-col gap-6 bg-primary-900 px-4 py-8 text-lg sm:px-12"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity || 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
