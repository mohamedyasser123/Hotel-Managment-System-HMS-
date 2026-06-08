import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi, type ChangePasswordFormData, type ForgotPasswordFormData, type LoginFormData, type ResetPasswordFormData, type SignUpFormData } from "../api/modules/auth";
import { useAuthContext } from "../context/AuthContext";


export default function useAuth(role: "admin" | "user" = "user") {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = useAuthContext();

const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(data, role);
      if (res?.data?.token) {
        const cleanToken = res.data.token.replace("Bearer ", "");
        const serverRole = res.data.user.role as "admin" | "user";
        localStorage.setItem("token", cleanToken);
        localStorage.setItem("role", serverRole);
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
      await authApi.changePassword(data);
      toast.success("تم تغيير كلمة المرور بنجاح");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل تغيير كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
    handleSignUp,
    handleForgotPassword,
    handleResetPassword,
    handleChangePassword
  };
}