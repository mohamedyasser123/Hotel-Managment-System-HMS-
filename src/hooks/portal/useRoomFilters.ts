import type { Dayjs } from "dayjs";
import { useState } from "react";

export default function useRoomFilters() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [capacity, setCapacity] = useState(1);

  const increase = () => setCapacity((prev) => prev + 1);

  const decrease = () =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    capacity,
    increase,
    decrease,
  };
}