import {createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";


export const router = createBrowserRouter([{
    path: "/",
    element: <Root/>,
    errorElement: <p>Error 404</p>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: <p>Login</p>,
        },
        {
            path: '/signup',
            element: <p>Signup</p>
        }
    ],
}]);