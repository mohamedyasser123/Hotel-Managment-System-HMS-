
import type { CreateFacilityData, CreateFacilityResponse, DeleteFacilityResponse, GetFacilitiesResponse, UpdateFacilityData, UpdateFacilityResponse } from "../../types/facilitiesTyepes";
import axiosClient from "../axoisClient";


// GET
export const getFacilities = async (): Promise<GetFacilitiesResponse> => {
  const response = await axiosClient.get("/admin/room-facilities");
  return response.data;
};



// CREAT
export const createFacilities = async (
  data: CreateFacilityData
): Promise<CreateFacilityResponse> => {
  const response = await axiosClient.post(
    "/admin/room-facilities",
    data
  );

  return response.data;
};



// UPDATE
export const updateFacility = async (
  id: string,
  data: UpdateFacilityData
): Promise<UpdateFacilityResponse> => {
  const response = await axiosClient.put(
    `/admin/room-facilities/${id}`,
    data
  );

  return response.data;
};


// DELET
export const deleteFacility = async (
  id: string
): Promise<DeleteFacilityResponse> => {
  const response = await axiosClient.delete(
    `/admin/room-facilities/${id}`
  );

  return response.data;
};