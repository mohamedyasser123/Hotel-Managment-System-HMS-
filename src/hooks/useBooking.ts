import { useEffect, useState } from "react";
import type { Booking } from "../types/bookingTypes";
import { getBookingList } from "../api/modules/booking";

export function useBooking() {
  const [data, setData] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(false);

  const getBookingsList = async () => {
    setLoading(true);

    try {
      const response = await getBookingList();

      setData(response.data.booking);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingsList();
  }, []);

  return {
    data,
    loading,
  };
}