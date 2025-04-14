import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";

import { IBooking, ICabin, ICountry, IGuest, ISettings } from "@/app/_types";

import { supabase } from "./supabase";

/////////////
// GET

export const getCabin = async (id: number): Promise<ICabin | null> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return data;
};

export const getCabinPrice = async (
  id: number,
): Promise<{ regularPrice: number; discount: number } | null> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
};

export const getCabins = async (): Promise<ICabin[]> => {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const getGuest = async (email: string): Promise<IGuest | null> => {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Database error:", error); // Better error logging
    return null; // Explicit null return on error
  }

  return data;
};

export const getBooking = async (id: number): Promise<IBooking | null> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }

  return data;
};

export const getBookings = async (guestId: number): Promise<IBooking[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(id, name, image)", // Include cabins(id...)
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
};

export const getBookedDatesByCabinId = async (
  cabinId: number,
): Promise<Date[]> => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Ensure time is set to midnight (UTC)

  // Use today as a Date object and convert to ISO string only for comparison
  const todayISOString = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayISOString},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  // Map bookings to an array of booked dates
  const bookedDates = data
    .map((booking: IBooking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate!),
        end: new Date(booking.endDate!),
      });
    })
    .flat();

  return bookedDates;
};

export const getSettings = async (): Promise<ISettings> => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
};

export const getCountries = async (): Promise<ICountry[]> => {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();

    return countries;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch countries");
  }
};

/////////////
// CREATE

// export const createGuest = async (newGuest: IGuest): Promise<IGuest[]> => {
//   const { data, error } = await supabase.from("guests").insert([newGuest]);

//   if (error) {
//     console.error(error);
//     throw new Error("Guest could not be created");
//   }

//   if (!Array.isArray(data)) {
//     throw new Error("Expected an array of guests");
//   }

//   return data as IGuest[];
// };

export const createGuest = async (
  newGuest: Omit<IGuest, "id" | "created_at">,
): Promise<IGuest> => {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error("Database error:", error); // More descriptive error
    throw new Error("Guest could not be created: " + error.message); // Include original error
  }

  return data as IGuest;
};

export const createBooking = async (
  newBooking: IBooking,
): Promise<IBooking> => {
  console.log("Creating booking with data:", newBooking);
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
};

/////////////
// UPDATE

export const updateGuest = async (
  id: number,
  updatedFields: Partial<IGuest>,
): Promise<IGuest> => {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
};

export const updateBooking = async (
  id: number,
  updatedFields: Partial<IBooking>,
): Promise<IBooking> => {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
};

/////////////
// DELETE

export const deleteBooking = async (id: number): Promise<void> => {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
};
