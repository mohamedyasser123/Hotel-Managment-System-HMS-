import type { AvailableRoomsResponse, GetAvailableRoomsParams } from "../../../types/portal/portalExplorType";
import axiosClient from "../../axoisClient";

export const getAvailableRooms = async (params: GetAvailableRoomsParams): Promise<AvailableRoomsResponse> => {
  const response = await axiosClient.get<AvailableRoomsResponse>('/portal/rooms/available', {
    params,
  });
  return response.data;
};