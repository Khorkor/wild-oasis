"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

interface BookingData {
  cabinPrice: number;
  cabinId: number;
}

export const updateGuest = async (formData: FormData): Promise<void> => {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;
  const nationalityData = formData.get("nationality") as string;
  if (!nationalityData) throw new Error("Nationality is required");

  const [nationality, countryFlag] = nationalityData.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
};

export const createBooking = async (
  bookingData: BookingData,
  formData: FormData,
): Promise<void> => {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const numGuests = Number(formData.get("numGuests"));
  const observations =
    (formData.get("observations") as string)?.slice(0, 1000) || "";

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
};

export const deleteBooking = async (bookingId: number): Promise<void> => {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
};

export const updateBooking = async (formData: FormData): Promise<void> => {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations:
      (formData.get("observations") as string)?.slice(0, 1000) || "",
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
};

export const signInAction = async (): Promise<void> => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async (): Promise<void> => {
  await signOut({ redirectTo: "/" });
};
