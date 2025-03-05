"use client";

import "react-day-picker/dist/style.css";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

import { useReservation } from "@/app/_context/ReservationContext";
import { ICabin, ISettings } from "@/app/_types";

interface IDateSelectorProps {
  settings: ISettings;
  cabin: ICabin;
  bookedDates: Date[];
}

function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: Date[],
): boolean {
  if (!range?.from || !range?.to) return false;

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! }),
  );
}

function DateSelector({ settings, cabin, bookedDates }: IDateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const typedRange: DateRange | undefined = range;
  const displayRange: DateRange | undefined = isAlreadyBooked(
    typedRange,
    bookedDates,
  )
    ? undefined
    : typedRange;

  const { regularPrice, discount } = cabin;
  const numNights: number =
    displayRange?.to && displayRange?.from
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice: number = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-6">
      {/* Flex container for calendar */}
      <div className="flex flex-row justify-between">
        {/* Calendar */}
        <div className="w-full md:w-3/5">
          {" "}
          {/* Full width on small screens */}
          <DayPicker
            className="rdp mycalendar place-self-center"
            classNames={{
              selected: "rdp-day_selected",
              range_start: "rdp-day_range_start",
              range_middle: "rdp-day_range_middle",
              range_end: "rdp-day_range_end",
            }}
            mode="range"
            onSelect={(newRange) => setRange(newRange!)}
            selected={displayRange}
            min={minBookingLength + 1}
            max={maxBookingLength}
            defaultMonth={new Date()}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
            captionLayout="dropdown"
            numberOfMonths={1}
            disabled={(curDate) =>
              isPast(curDate) ||
              bookedDates.some((date) => isSameDay(date, curDate))
            }
          />
        </div>
      </div>

      <div className="mt-4 flex h-16 items-center justify-between bg-accent-500 px-4 text-primary-800 sm:mt-6 sm:h-[72px] sm:px-8">
        <div className="flex items-baseline gap-3 sm:gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 py-1 text-lg sm:px-3 sm:py-2 sm:text-2xl">
                <span>×</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm font-bold uppercase sm:text-lg">
                  Total
                </span>{" "}
                <span className="text-lg font-semibold sm:text-2xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 px-3 py-1 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
