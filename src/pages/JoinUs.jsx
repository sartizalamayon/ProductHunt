import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const JoinUs = ({ current }) => {
    const [curr, setCurr] = useState(current ? current : 'login');
    const { 
        createUser, 
        logInWithEmailPass, 
        logInWithGoogle, 
        loading,
        setLoading
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (curr === 'login') {
            logInWithEmailPass(email, password)
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            createUser(email, password)
                .then(() => {
                    navigate('/');
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    };

    const handleGoogle = () => {
        setError('');
        setLoading(true);
        
        logInWithGoogle()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="w-full flex justify-center items-center min-h-[calc(100vh-7rem)]">
            <div className="max-w-md w-full bg-primary rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-white">
                    {curr === 'login' ? 'Welcome Back' : 'Join Us'}
                </h2>
                <p className="text-center text-white">
                    {curr === 'login' ? 'Sign in to your account' : 'Create a new account'}
                </p>
                {error && <p className="text-center text-white">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder="john@example.com"
                            className="peer h-10 w-full border-b-2 border-white text-white bg-primary placeholder-transparent focus:outline-none focus:border-secondary pl-1"
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            className="absolute left-0 -top-4 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-secondary peer-focus:text-sm"
                            htmlFor="email"
                        >
                            Email address
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Password"
                            className="peer h-10 w-full border-b-2 border-white text-white bg-primary placeholder-transparent focus:outline-none focus:border-secondary pl-1"
                            required
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            className="absolute left-0 -top-4 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-secondary peer-focus:text-sm"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <button
                        className={`w-full py-2 px-4 rounded-md shadow-lg text-white font-semibold transition duration-200 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-primary'
                        }`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : curr === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <div className="text-center text-white">
                    {curr === 'login' ? "Don't have an account?" : 'Already have an account?'}
                    <a 
                        className="text-secondary hover:underline cursor-pointer ml-1" 
                        onClick={() => setCurr(curr === 'login' ? 'signup' : 'login')}
                    >
                        {curr === 'login' ? 'Sign up' : 'Sign in'}
                    </a>
                </div>
                <div className="text-center text-white">
                    <button 
                        className={`w-full py-2 px-4 bg-white hover:shadow-2xl rounded-md shadow-lg text-secondary font-semibold transition duration-200 mt-4 ${
                            loading ? 'cursor-not-allowed' : ''
                        }`}
                        onClick={handleGoogle}
                        disabled={loading}
                    >
                        <p className="flex justify-center gap-4 items-center">
                            <FcGoogle className="text-2xl"/>
                            <span>{loading ? 'Loading...' : curr === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
