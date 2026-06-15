import type { GetUsersResponse } from "../../types/UsersTypes";
import axiosClient from "../axoisClient";

export const getUsersList = async (page:number,size:number): Promise<GetUsersResponse> => {
  const response = await axiosClient.get(`/admin/Users?page=${page}&size=${size}`);

  return response.data;
};