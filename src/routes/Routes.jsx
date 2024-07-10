import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

import SingleRoom from "../components/SingleRoom/SingleRoom";
import MeterNumber from "../components/MeterNumber/MeterNumber";
import MonthlyBills from "../pages/MonthlyBills";
const baseURL = import.meta.env.VITE_BASE_URL;

export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/meterNumber",
                element: <MeterNumber/>
            },
            {
                path:"/monthlyBills",
                element: <MonthlyBills/>
            },
            {
                path: "/singleroom/:id",
                element: <SingleRoom></SingleRoom>,
                loader: ({params})=> fetch(`${baseURL}/rooms/${params.id}`)
              },
            // {
            //     path:'/dashboard',
            //     element: <Dashboard/>
            // }
        ]

    },
    // {
    //     path:"/login",
    //     element: <Login/>
    // },
    // {
    //     path:"/register",
    //     element: <Register/>
    // },
])