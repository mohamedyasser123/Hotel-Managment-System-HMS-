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
  console.log("Sending Room ID =>", roomId);

  const response = await axiosClient.delete(
    `/portal/favorite-rooms/${roomId}`,
    {
      data: {
        roomId,
      },
    }
  );

  console.log("DELETE RESPONSE =>", response);

  return response.data;
};