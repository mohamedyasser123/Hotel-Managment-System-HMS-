
import axios from "axios";
import type { GetRoomsParams, GetRoomsResponse } from "../../../types/portal/exploreRooms";

export const getExploreRooms = async (
  params: GetRoomsParams
): Promise<GetRoomsResponse> => {
  const response = await axios.get("portal/rooms", {
    params,
  });

  return response.data;
};