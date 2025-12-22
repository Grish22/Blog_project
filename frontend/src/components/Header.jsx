import React, { useState } from "react";
import UseContext from "../context/usercontest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";
function Header() {
    const { user,isLoggedIn, setUserfunc, setIsLoggedInfunc } = UseContext();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        const fetchLogout = async () => {
            try {
                const response = await fetch(`${API_BASE}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                if (response.ok) {
                    toast.success("Logout successful!");
                    localStorage.removeItem('user');
                    localStorage.removeItem('isLoggedIn');
                    setUserfunc(null);
                    setIsLoggedInfunc(false);
                    navigate("/login");
                } else {
                    toast.success("Logout failed.");
                }
            } catch (error) {
                toast.success("Error during logout: " + error.message);
            }
        };
        fetchLogout();
    };
    
    if(isLoggedIn && !user) return null;
    return (
        <nav className="w-full bg-indigo-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 transition duration-150">
                            Home
                        </a>
                    </div>

                    <div className="flex items-center">
                        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center space-x-4 absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-indigo-200 md:bg-transparent p-4 md:p-0 flex-col md:flex-row gap-2 md:gap-0`}>
                            {isLoggedIn ? (
                                <>
                                    {user.userType === "admin" ? (
                                        <>
                                            <a href="/host/create" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                                                Create Blog
                                            </a>
                                            <a href="/host/all" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                                                My Blogs
                                            </a>
                                        </>
                                    ) : (
                                        <a href="/user/all" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                                            View Blogs
                                        </a>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href="/login" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                                        Login
                                    </a>
                                    <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                                        Sign up
                                    </a>
                                </>
                            )}
                        </div>
                        
                        <div className="md:hidden ml-4">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-4xl text-indigo-600 hover:text-indigo-900 focus:outline-none"
                            >
                                &#8801;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
       
    );
}

export default Header;
