import type { CreateBookingPayload, CreateBookingResponse } from "../../../types/portal/portalBookingTypes";
import axiosClient from "../../axoisClient";


export const apiCreateBooking = async (
  data: CreateBookingPayload
): Promise<CreateBookingResponse> => {
  const response = await axiosClient.post(
    "/portal/booking",
    data
  );

  return response.data;
};
