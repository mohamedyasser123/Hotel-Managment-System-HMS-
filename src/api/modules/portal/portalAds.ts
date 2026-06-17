import type { AdsResponse, GetAdsParams } from "../../../types/portal/usePortalAdsTypes";
import axiosClient from "../../axoisClient";

export const getAds = async (
  params?: GetAdsParams
): Promise<AdsResponse> => {
  const response = await axiosClient.get<AdsResponse>("/portal/ads", {
    params,
  });

  return response.data;
};