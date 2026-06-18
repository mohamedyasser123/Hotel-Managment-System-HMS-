import { useEffect, useState } from "react";
import type { RoomDetails } from "../../types/portal/pageDetailesType";
import { getRoomDetails } from "../../api/modules/portal/pageDetailes";

export default function useRoomDetails(id?: string) {
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);

        const response = await getRoomDetails(id);

        setRoom(response.data.room);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  return {
    room,
    loading,
    error,
  };
}