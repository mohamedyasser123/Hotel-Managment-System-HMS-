import { useEffect, useState } from "react";
import type { Booking } from "../types/bookingTypes";
import { getBookingList } from "../api/modules/booking";

export function useBooking() {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
  page: 0,
  pageSize: 5,
});

 const [totalCount, setTotalCount] = useState(0);

  const getBookingsList = async () => {
    setLoading(true);

    try {
      const response = await getBookingList(paginationModel.page + 1, paginationModel.pageSize);

      setData(response.data.booking);
       setTotalCount(response.data.totalCount);


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingsList();
  }, [paginationModel]);

  return {
    data,
    loading,
      totalCount,
  paginationModel,
  setPaginationModel,
  };
}