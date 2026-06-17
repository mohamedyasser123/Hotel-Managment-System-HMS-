import  { useEffect, useState } from 'react'
import type { AvailableRoomsResponse, GetAvailableRoomsParams } from '../../types/portal/portalExplorType';
import { getAvailableRooms } from '../../api/modules/portal/portalExplore';

export default function usePortalExplore(params: GetAvailableRoomsParams) {
 const [data, setData] = useState<AvailableRoomsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAvailableRooms(params);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.page, params.size, params.startDate, params.endDate]); 

  return { data, isLoading, error };
}
