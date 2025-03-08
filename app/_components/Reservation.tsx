import { Session } from "next-auth";

import LoginMessage from "@/app/_components/LoginMessage";
import { auth } from "@/app/_lib/auth";
import { ICabin, ISettings } from "@/app/_types";

import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

interface IReservationProps {
  cabin: ICabin;
}

async function Reservation({ cabin }: IReservationProps) {
  const [settings, bookedDates]: [ISettings, Date[]] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session: Session | null = await auth();

  return (
    <div className="grid grid-cols-1 items-stretch border border-primary-800 md:grid-cols-[2fr_1fr]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
