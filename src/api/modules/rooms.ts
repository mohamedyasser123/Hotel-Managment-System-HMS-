import axiosClient from "../axoisClient";
import type { GetRoomsResponse } from "../../types/room.Type";

export const getRooms = async (): Promise<GetRoomsResponse> => {
  const response = await axiosClient.get("/admin/rooms");

  return response.data;
};