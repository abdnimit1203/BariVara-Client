import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import MeterNumber from "../components/MeterNumber/MeterNumber";
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