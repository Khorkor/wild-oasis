"use client";

import "react-day-picker/dist/style.css";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react"; // Import useState and useEffect
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
  const currentYear = new Date().getFullYear();

  // Detect screen width using useState and useEffect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's sm breakpoint
    };

    // Set initial value
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-2 sm:p-4">
      {/* Flex container for calendar */}
      <div className="flex flex-row justify-center">
        {/* Calendar */}
        <div className="w-full">
          <DayPicker
            className="rdp mycalendar place-self-center"
            classNames={{
              selected: "rdp-day_selected",
              range_start: "rdp-day_range_start",
              range_middle: "rdp-day_range_middle",
              range_end: "rdp-day_range_end",
              caption_dropdowns: "bg-primary-900 text-primary-800", // Custom styles for year selector
            }}
            mode="range"
            onSelect={(newRange) => setRange(newRange!)}
            selected={displayRange}
            min={minBookingLength + 1}
            max={maxBookingLength}
            startMonth={new Date()}
            endMonth={new Date(currentYear + 5, 11)}
            captionLayout="dropdown"
            numberOfMonths={isMobile ? 1 : 2} // 1 month on mobile, 2 on larger screens
            disabled={(curDate) =>
              isPast(curDate) ||
              bookedDates.some((date) => isSameDay(date, curDate))
            }
          />
        </div>
      </div>

      <div className="mt-2 flex h-12 items-center justify-between bg-accent-500 px-2 text-primary-800 sm:mt-4 sm:h-16 sm:px-4 md:h-[72px] md:px-8">
        <div className="flex items-baseline gap-2 sm:gap-3 md:gap-6">
          <p className="flex items-baseline gap-1 sm:gap-2">
            {discount > 0 ? (
              <>
                <span className="text-lg sm:text-xl md:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-xs sm:text-sm md:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-1 py-0.5 text-base sm:px-2 sm:py-1 sm:text-lg md:px-3 md:py-2 md:text-2xl">
                <span>×</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-xs font-bold uppercase sm:text-sm md:text-lg">
                  Total
                </span>{" "}
                <span className="text-base font-semibold sm:text-lg md:text-2xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 px-2 py-0.5 text-xs font-semibold sm:px-3 sm:py-1 md:px-4 md:py-2 md:text-sm"
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
