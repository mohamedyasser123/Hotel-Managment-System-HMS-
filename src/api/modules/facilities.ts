
import type { GetFacilitiesResponse } from "../../types/Facilities";
import axiosClient from "../axoisClient";

export const getFacilities = async (): Promise<GetFacilitiesResponse> => {
  const response = await axiosClient.get("/admin/room-facilities");
  return response.data;
};