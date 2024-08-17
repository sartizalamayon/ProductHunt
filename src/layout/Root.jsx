import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Root = () => {
    return (
        <>
            <Header/>
            <div className="container mx-auto min-h-[calc(100vh-7rem)]">
            <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Root;