import { useState } from "react";

export default function useRoomFilters() {
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [capacity, setCapacity] = useState(1);

  const increase = () => setCapacity((prev) => prev + 1);

  const decrease = () =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    dateRange,
    setDateRange,
    capacity,
    increase,
    decrease,
  };
}