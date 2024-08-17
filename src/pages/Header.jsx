import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
    const {user, logOut} = useContext(AuthContext)
    return (
        <header className="bg-primary text-white h-[4rem] px-8 flex justify-between items-center">
            <Link to='/'><div className="text-xl font-medium">ProductHunt</div></Link>
            {user? (
                <div className="flex justify-center items-center gap-2"><p className="text-sm">Hi, <span className="text-secondary text-lg">{user?.email?.split('@')[0]}</span></p>
                <button onClick={logOut} className="border-2 text-secondary border-secondary py-2 px-4 rounded-md hover:bg-secondary hover:text-white font-medium">
                Logout       </button></div>
            ):(<Link to='/join'><button className="border-2 text-secondary border-secondary py-2 px-4 rounded-md hover:bg-secondary hover:text-white font-medium">
                Join Us       </button></Link>)}
        </header>
    );
};

export default Header;
