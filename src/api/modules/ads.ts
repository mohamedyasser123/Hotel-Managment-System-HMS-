import axiosClient from "../axoisClient";
import type {
  CreateAdsData,
  CreateAdsResponse,
  DeleteAdsResponse,
  GetAdsDetailsResponse,
  GetAdsResponse,
  UpdateAdsData,
  UpdateAdsResponse,
} from "../../types/ads.Type";


// GET ALL
export const getAds = async (page:number , size:number): Promise<GetAdsResponse> => {
  const response = await axiosClient.get(`/admin/ads?page=${page}&size=${size}`);
  return response.data;
};


// GET DETAILS
export const getAdsDetails = async (
  id: string
): Promise<GetAdsDetailsResponse> => {
  const response = await axiosClient.get(
    `/admin/ads/${id}`
  );

  return response.data;
};


// CREATE
export const createAds = async (
  data: CreateAdsData
): Promise<CreateAdsResponse> => {
  const response = await axiosClient.post(
    "/admin/ads",
    data
  );

  return response.data;
};


// UPDATE
export const updateAds = async (
  id: string,
  data: UpdateAdsData
): Promise<UpdateAdsResponse> => {
  const response = await axiosClient.put(
    `/admin/ads/${id}`,
    data
  );

  return response.data;
};


// DELETE
export const deleteAds = async (
  id: string
): Promise<DeleteAdsResponse> => {
  const response = await axiosClient.delete(
    `/admin/ads/${id}`
  );

  return response.data;
};