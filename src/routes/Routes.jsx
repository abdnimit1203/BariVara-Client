import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MyRooms from "../pages/MyRooms";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MonthlyBills from "../pages/MonthlyBills";
import MeterNumber from "../components/MeterNumber/MeterNumber";
import SingleRoom from "../components/SingleRoom/SingleRoom";
import TenantManagement from "../pages/admin/TenantManagement";
import UserManagement from "../pages/admin/UserManagement";
import UtilitySettings from "../pages/admin/UtilitySettings";
import Profile from "../pages/Profile";
import PrivateRoutes from "./PrivateRoutes";
import RoleRoute from "./RoleRoute";
import axiosInstance from "../utils/axiosConfig";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <RoleRoute allow={["superadmin", "admin"]}>
        <AdminLayout />
      </RoleRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tenants",
        element: <TenantManagement />,
      },
      {
        path: "rooms",
        element: <MyRooms />,
      },
      {
        path: "rooms/:id",
        element: <SingleRoom />,
        loader: async ({ params }) => {
          const res = await axiosInstance.get(`/rooms/${params.id}`);
          return res.data;
        },
      },
      {
        path: "meter",
        element: <MeterNumber />,
      },
      {
        path: "bills",
        element: <MonthlyBills />,
      },
      {
        path: "users",
        element: (
          <RoleRoute allow={["superadmin"]}>
            <UserManagement />
          </RoleRoute>
        ),
      },
      {
        path: "utility-settings",
        element: (
          <RoleRoute allow={["superadmin"]}>
            <UtilitySettings />
          </RoleRoute>
        ),
      },
    ],
  },
]);
