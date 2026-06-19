import axiosClient from "../../axoisClient";

export const getFavorites = async () => {
  const response = await axiosClient.get("/portal/favorite-rooms");
  return response.data;
};

export const addFavorite = async (roomId: string) => {
  const response = await axiosClient.post(
    "/portal/favorite-rooms",
    { roomId }
  );
  return response.data;
};

export const removeFavorite = async (roomId: string) => {
  const response = await axiosClient.delete(
    "/portal/favorite-rooms",
    {
      data: { roomId },
    }
  );

  return response.data;
};