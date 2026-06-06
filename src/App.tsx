import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import AuthLayout from './layouts/AuthLayout';
import Login from './modules/Authuntication/Components/Login/Login';
import Register from './modules/Authuntication/Components/Register/Register';
import ForgotPassword from './modules/Authuntication/Components/ForgetPassword/ForgotPassword';
import VerifyAccount from './modules/Authuntication/Components/VerifyAccount/VerifyAccount';
import ResetPassword from './modules/Authuntication/Components/RestPassword/ResetPassword';
import ChangePassword from './modules/Authuntication/Components/ChangePassword/ChangePassword';
import NotFound from './modules/Shared/Components/NotFound/NotFound';
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./modules/Admin/Components/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import LandingPage from "./modules/User/Compoments/Home/LandingPage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
    useEffect(() => {
      document.documentElement.dir =
        i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgotPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "home",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <LandingPage /> }],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App
