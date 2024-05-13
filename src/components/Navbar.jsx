import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate= useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
      navigate('/login');
    };

    return (
        <nav className="bg-opacity-90 md:bg-opacity-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Home</Link>
            <div className="hidden md:flex">
                {localStorage.getItem('token') ? (
                    <>
                        <Link to="/job-post" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Add Job Post</Link>
                        <Link to="/job-post-list" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Job Post List</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Login</Link>
                        <Link to="/register" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Register</Link>
                    </>
                )}
            </div>
            <div className="md:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        {menuOpen && (
            <div className="md:hidden">
                <div className="flex flex-col items-center">
                    {localStorage.getItem('token') && (
                        <Link to="/job-post" className="text-white my-2">Job Post</Link>
                    )}
                    {localStorage.getItem('token') && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
                        >
                            Logout
                        </button>
                    )}
                    {!localStorage.getItem('token') && (
                        <>
                            <Link to="/login" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Login</Link>
                            <Link to="/register" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Register</Link>
                        </>
                    )}
                </div>
            </div>
        )}
    </nav>
    );
};

export default Navbar;
