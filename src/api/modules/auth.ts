import axiosClient from "../axoisClient";

export type AuthFormData = {
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
};

export type SignUpFormData = AuthFormData;
export type LoginFormData = Pick<AuthFormData, 'email' | 'password'>;
export type ForgotPasswordFormData = Pick<AuthFormData, 'email'>;
export type ResetPasswordFormData = Pick<AuthFormData, 'email' | 'password' | 'confirmPassword'> & { seed: string; };
export type ChangePasswordFormData = Pick<AuthFormData, 'password' | 'confirmPassword'> & { oldPassword: string; };

export const authApi = {
  login: async (data: LoginFormData, role: "admin" | "users") => {
    const path = role === "admin" ? "/admin/users/login" : "/users/login"; 
    const response = await axiosClient.post(path, data);
    return response.data;
  },

signUp: async (data: SignUpFormData) => {

  const formData = new FormData();

  formData.append("userName", data.userName);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("email", data.email);
  formData.append("country", data.country);
  formData.append("password", data.password);
  formData.append(
    "confirmPassword",
    data.confirmPassword
  );

  formData.append("role", "user");

  if (
    data.profileImage &&
    data.profileImage.length > 0
  ) {
    formData.append(
      "profileImage",
      data.profileImage[0]
    );
  }

  const response = await axiosClient.post(
    "/portal/users",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
},

  forgotPassword: async (data: ForgotPasswordFormData, role: "admin" | "users") => {
    const path = role === "admin" ? "/admin/users/forgot-password" : "/users/forgot-password"; 
    const response = await axiosClient.post(path, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordFormData) => {
    const response = await axiosClient.post("/Users/Reset", data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordFormData) => {
    const response = await axiosClient.put("/Users/ChangePassword", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  }
};