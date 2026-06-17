import { useState } from "react";
import { getExploreRooms } from "../../api/modules/portal/exploreRooms";
import type { Room } from "../../types/portal/exploreRooms";

export function useExploreRooms() {
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [capacity, setCapacity] = useState(2);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const increase = () => setCapacity((prev) => prev + 1);

  const decrease = () =>
    setCapacity((prev) => (prev > 1 ? prev - 1 : 1));

  const setDates = (value: [any, any]) => {
    setDateRange(value);
  };

  const getRooms = async () => {
    try {
      setLoading(true);

      const response = await getExploreRooms({
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString(),
        capacity,
      });

      setRooms(response.data.rooms);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    dateRange,
    capacity,
    increase,
    decrease,
    setDates,
    rooms,
    loading,
    error,
    getRooms,
  };
}