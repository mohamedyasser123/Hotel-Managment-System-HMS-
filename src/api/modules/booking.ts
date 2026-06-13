import type { GetBookingsResponse } from "../../types/bookingTypes";
import axiosClient from "../axoisClient";


export const getBookingList =
  async (): Promise<GetBookingsResponse> => {
    const response = await axiosClient.get(
      "/admin/booking"
    );

    return response.data;
  };