import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi, type ChangePasswordFormData, type ForgotPasswordFormData, type LoginFormData, type ResetPasswordFormData, type SignUpFormData } from "../api/modules/auth";
import { useAuthContext } from "../context/AuthContext";


export default function useAuth(role: "admin" | "user" = "user") {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const { saveLoginData } = useAuthContext();

const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(data, role);
      if (res?.data?.token) {
        const cleanToken = res.data.token.replace("Bearer ", "");
        const serverRole = res.data.user.role as "admin" | "user";
        const userId = res.data.user._id;
        localStorage.setItem("token", cleanToken);
        localStorage.setItem("role", serverRole);
        localStorage.setItem("userId", userId);
        saveLoginData(cleanToken); 
        toast.success(res.message || "User logged in successfully");
        if (serverRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
       const response = await authApi.signUp(data);
       toast.success(response.message);
       navigate("/login");
       
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        });
      } else {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
     const response= await authApi.forgotPassword(data, role);
      toast.success(response.message);
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
     const response= await authApi.resetPassword(data,role);
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message ||" Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
     const response= await authApi.changePassword(data,role);
      toast.success(response.message);
     navigate("/login");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
const fetchProfile = async () => {
 const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

if (!token || !userId) {
  return;
}

  setIsLoading(true);

  try {
    const response = await authApi.getUserProfile(userId);

    if (response.success) {
      setData(response.data);
    }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to load profile"
    );
  } finally {
    setIsLoading(false);
  }
};

  return {
    data,
    isLoading,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
    handleResetPassword,
    handleChangePassword,
    fetchProfile
  };
}