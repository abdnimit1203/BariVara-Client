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
import PrivateRoutes from "./PrivateRoutes";
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
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-rooms",
        element: (
          <PrivateRoutes>
            <MyRooms />
          </PrivateRoutes>
        ),
      },
      {
        path: "/monthlyBills",
        element: (
          <PrivateRoutes>
            <MonthlyBills />
          </PrivateRoutes>
        ),
      },
      {
        path: "/meterNumber",
        element: (
          <PrivateRoutes>
            <MeterNumber />
          </PrivateRoutes>
        ),
      },
      {
        path: "/singleroom/:id",
        element: (
          <PrivateRoutes>
            <SingleRoom />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const res = await axiosInstance.get(`/rooms/${params.id}`);
          return res.data;
        },
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <AdminLayout />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/tenants" replace />,
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
        path: "meter",
        element: <MeterNumber />,
      },
      {
        path: "bills",
        element: <MonthlyBills />,
      },
    ],
  },
]);
