import { useState } from "react";
import { Dayjs } from "dayjs";
import { apiCreateBooking } from "../../api/modules/portal/portalBooking";

export function usePortalBooking(roomId?: string) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [capacity, setCapacity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const increase = () => setCapacity((p) => p + 1);
  const decrease = () => setCapacity((p) => (p > 1 ? p - 1 : 1));

  const createBooking = async (roomPrice: number) => {
    if (!roomId) throw new Error("Room not found");
    if (!startDate || !endDate) throw new Error("Dates required");

    setLoading(true);

    try {
      const days =
        endDate.diff(startDate, "day") || 1;

      const totalPrice = days * roomPrice * capacity;

      const payload = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        room: roomId,
        totalPrice,
      };

      const res = await apiCreateBooking(payload);
      setData(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    capacity,
    increase,
    decrease,
    createBooking,
    loading,
    error,
  };
}