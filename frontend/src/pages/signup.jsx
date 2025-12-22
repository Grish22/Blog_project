import React from "react";
import { useState } from 'react';
import UseContext from "../context/usercontest.jsx";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";
function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const { setUserfunc } = UseContext();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "userType": userType
        };
        const fetchSignup = async () => {
            try {
                const response = await fetch(`${API_BASE}/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    toast.success(result.message);
                    console.log("User created:", result.user);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    setUserfunc(result.user);
                    navigate("/login"); 
                }
                else {
                    console.log(result);
                    toast.success("Signup failed: " + result.message.join(", "));
                }
                console.log(result);
            } catch (error) {
                toast.success("Error during signup: " + error.message);
            }
        };
        fetchSignup();
    };
    return (
        <div className="bg-gray-100 py-26 flex flex-col justify-start sm:py-24">
            <div className="relative py-3 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4">
                <div className="relative px-6 py-8 bg-white shadow-lg rounded-xl sm:rounded-2xl sm:px-10 sm:py-10">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Sign Up</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input 
                                                type="text" 
                                                name="firstName" 
                                                placeholder="First Name" 
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input 
                                                type="text" 
                                                name="lastName" 
                                                placeholder="Last Name" 
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            placeholder="Email address"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            name="confirmPassword" 
                                            placeholder="Confirm password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                                        <select 
                                            name="userType" 
                                            id="userType" 
                                            onChange={(e) => setUserType(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <input 
                                            type="checkbox" 
                                            name="terms" 
                                            required
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">
                                            I agree to the terms and conditions
                                        </label>
                                    </div>

                                    <div>
                                        <button 
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign Up
                                        </button>
                                    </div>

                                    <p className="text-center text-sm text-gray-600 mt-4">
                                        Already have an account?{" "}
                                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Login
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
