import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx"
import GuestRoute from "./features/auth/components/GuestRoute.jsx"
import Home from "./features/interview/pages/Home.jsx";

export const router = createBrowserRouter([
    {
        path: "/login", 
        element: <GuestRoute><Login/></GuestRoute>
    },
    {
        path:"/register",
        element:<GuestRoute><Register/></GuestRoute>
    }, 
    {
        path:"/",
        element: <ProtectedRoute>
            <Home/>
        </ProtectedRoute>
    }
])