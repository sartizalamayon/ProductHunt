import {createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";


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
            path: "/join",
            element: <JoinUs/>,
        },
    ],
}]);