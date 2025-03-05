import LoginMessage from "@/app/_components/LoginMessage";
import { ICabin, IGuest, ISettings } from "@/app/_types";

import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

// interface ISession {
//   user?: IGuest;
// }

interface IReservationProps {
  cabin: ICabin;
}

async function Reservation({ cabin }: IReservationProps) {
  const [settings, bookedDates]: [ISettings, Date[]] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  // const session: ISession | null = await auth();

  return (
    <div className="grid grid-cols-1 border border-primary-800 md:grid-cols-2">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
      {/* {session?.user ? (
      
      ) : (
        <LoginMessage />
      )} */}
    </div>
  );
}

export default Reservation;
