import { useEffect, useState } from "react";
import type { Ad, GetAdsParams } from "../../types/portal/usePortalAdsTypes";
import { getAds } from "../../api/modules/portal/portalAds";

export default function usePortalAds(params?: GetAdsParams) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);

        const response = await getAds(params);

       setAds(response.data.ads);;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [
    params?.page,
    params?.size,
    params?.isActive
  ]);

  return {
    ads,
    loading,
    error,
  };
}