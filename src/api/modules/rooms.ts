import type {  DeleteRoomResponse, GetRoomsResponse, } from "../../types/roomTypes";
import axiosClient from "../axoisClient";

export const getRooms = async (
  page: number,
  size: number
): Promise<GetRoomsResponse> => {
  const response = await axiosClient.get(
    `/admin/rooms?page=${page}&size=${size}`
  );

  return response.data;
};

export const createRoom = async (data: FormData): Promise<any> => {
  const response = await axiosClient.post("/admin/rooms", data, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return response.data;
};

export const updateRoom = async (id: string, data: FormData): Promise<any> => {
  const response = await axiosClient.put(`/admin/rooms/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteRoom = async (
    id: string
): Promise<DeleteRoomResponse> => {
    const response = await axiosClient.delete(
        `/admin/rooms/${id}`
    );
    return response.data;
};