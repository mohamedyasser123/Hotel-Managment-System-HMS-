import type { RoomDetailsResponse } from "../../../types/portal/pageDetailesType";
import axiosClient from "../../axoisClient";

export const getRoomDetails = async (
  id: string
): Promise<RoomDetailsResponse> => {
  const response = await axiosClient.get<RoomDetailsResponse>(
    `/portal/rooms/${id}`
  );

  return response.data;
};