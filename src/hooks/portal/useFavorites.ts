import { useEffect, useState } from "react";
import { getFavorites } from "../../api/modules/portal/favorites";
import type { FavoritesResponse } from "../../types/portal/favorites";
export default function useFavorites() {
  const [data, setData] = useState<FavoritesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
  setIsLoading(true);

  const result = await getFavorites();

  setData(result);
  setError(null);

} catch (err) {
  console.log("Favorites Error =>", err);
  setError(err);

} finally {
  setIsLoading(false);
}
    };

    fetchFavorites();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}