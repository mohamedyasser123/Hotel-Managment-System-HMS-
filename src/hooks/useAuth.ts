import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi, type ChangePasswordFormData, type ForgotPasswordFormData, type LoginFormData, type ResetPasswordFormData, type SignUpFormData } from "../api/modules/auth";


export default function useAuth(role: "admin" | "users" = "users") {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(data, role);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", role);
      }
      toast.success("تم تسجيل الدخول بنجاح");
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل تسجيل الدخول");
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
      await authApi.forgotPassword(data, role);
      toast.success("تم إرسال كود الاستعادة إلى إيميلك");
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل إرسال الطلب");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await authApi.resetPassword(data);
      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "فشل إعادة التعيين");
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