import type { GetUsersResponse } from "../../types/UsersTypes";
import axiosClient from "../axoisClient";

export const getUsersList = async (): Promise<GetUsersResponse> => {
  const response = await axiosClient.get("/admin/users");

  return response.data;
};