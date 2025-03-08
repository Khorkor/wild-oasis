import { NextRequest, NextResponse } from "next/server";

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(
  request: NextRequest,
  { params }: { params: { cabinId: string } },
) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);

    return NextResponse.json({ cabin, bookedDates });
  } catch {
    return NextResponse.json({ message: "Cabin not found" });
  }
}
