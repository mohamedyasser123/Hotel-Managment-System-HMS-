import { useState } from "react";
import { apiCreateBooking } from "../../api/modules/portal/portalBooking";

export  function usePortalBooking(roomId?: string) {
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [capacity, setCapacity] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  // CAPACITY HANDLERS
  const increase = () => setCapacity((prev) => prev + 1);
  const decrease = () =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  // DATE HANDLER
  const setDates = (value: [any, any]) => {
    setDateRange(value);
  };

  // CREATE BOOKING 
  const createBooking = async () => {
    try {
          if (!roomId) {
      throw new Error("roomId is missing");
    }
      setLoading(true);
      setError(null);

      const payload = {
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString(),
        capacity,
        room: roomId,
      };
      const response = await apiCreateBooking(payload);
      setData(response);

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    dateRange,
    capacity,
    loading,
    error,
    data,
    setDates,
    increase,
    decrease,
    createBooking,
  };
}