import { Cabin } from './Cabin';

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice: number;
  status?: string;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  cabin?: Cabin;
}
