import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MyRooms from "../pages/MyRooms";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MonthlyBills from "../pages/MonthlyBills";
import MeterNumber from "../components/MeterNumber/MeterNumber";
import SingleRoom from "../components/SingleRoom/SingleRoom";
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
        path: "/my-rooms",
        element: <MyRooms />,
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
        element: <Dashboard />,
      },
      {
        path: "/monthlyBills",
        element: <MonthlyBills />,
      },
      {
        path: "/meterNumber",
        element: <MeterNumber />,
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
]);
