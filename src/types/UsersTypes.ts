export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: "admin" | "user";
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
  };
}