import type { GetBookingsResponse } from "../../types/bookingTypes";
import axiosClient from "../axoisClient";


export const getBookingList =
  async (page: number,size:number): Promise<GetBookingsResponse> => {
    const response = await axiosClient.get(
      `/admin/booking?page=${page}&size=${size}`
    );

    return response.data;
  };

