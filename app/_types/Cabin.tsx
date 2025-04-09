export interface ICabin {
  id: number;
  created_at?: string; // timestamp with time zone
  name?: string;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  description?: string;
  image?: string; // optional image field
}

export type ICabinFilterOption = "all" | "small" | "medium" | "large";
