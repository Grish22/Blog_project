import React, { use } from "react";
import {useEffect} from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import UseContext from "../context/usercontest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";
function Viewblog () {
    const [Blogdata, setBlogData] = useState([]);
    const navigate=useNavigate();
    const {user}=UseContext();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${API_BASE}/user/all`, {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const blogData = await response.json();
                    console.log("Blog data fetched successfully:", blogData);
                    setBlogData(blogData.blogs);
                    console.log(blogData.blogs);
                } else {
                    toast.success("Failed to fetch blog.");
                }
            } catch (error) {
                toast.success("Error fetching blog: " + error.message);
            }
        };
        fetchBlog();
    }, []);
    const handleDescription=(blogid)=>{
        const fetchData = async()=>{
            try{
                console.log(user.id);
               const response= await fetch(`${API_BASE}/user/views/${blogid}`,{
                   method:'POST',
                   headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({userid:user.id})
               });
               if(response.ok){
                    console.log("OKAY");
               }
               else{
                   console.log("Your view is not considered");
               }
            }
            catch(error){
                console.log("Your view is not considered");
            }
        }

        fetchData();
        navigate(`/user/all/${blogid}`,{
            state:{
                blogId:blogid
            }
        });
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                    Discover Amazing Blogs
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Explore our collection of insightful articles, stories, and knowledge shared by our community.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Blogdata.map((blog) => (
                        <div 
                            key={blog._id} 
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Blog Image */}
                            <div className="w-full h-48 overflow-hidden rounded-t-xln">
                                <img 
                                    src={`${API_BASE}/${encodeURI(blog.path.replace("\\", "/"))}`} 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            
                            {/* Blog Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {blog.description || "Click to read more about this interesting topic..."}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-600 font-semibold">

                                                {blog.author?.firstName?.[0] || 'A' }
                                            </span>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {blog.author?.firstName || 'Anonymous' }

                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleDescription(blog._id)}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-150 ease-in-out"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {Blogdata.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No blogs available at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Viewblog ;