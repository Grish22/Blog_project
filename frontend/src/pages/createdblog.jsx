import React from "react";
import {useEffect} from "react";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import UseContext from "../context/usercontest";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";
function CreatedBlog() {
    const location = useLocation();
    const isEdit = location.state?.isEdit || false;
    const blogDataNew = location.state?.blogData || null;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file,setFile]= useState("");
    useEffect(() => {
    if (isEdit && blogDataNew!=null) {
      setTitle(blogDataNew.title);
      setContent(blogDataNew.content);
    }
  }, [isEdit, blogDataNew]);
    const {user} = UseContext();
    const navigate = useNavigate();

    const handleCreateBlog = (event) => {
        event.preventDefault();
        const formData=new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', user.id);
        formData.append('file', file);
        // const blogData = {
        //     title: title,
        //     content: content,
        //     author:user.id
        // };
        const method= isEdit? "PUT" : "POST" ;
        const URL = !isEdit ? `${API_BASE}/host/create` : `${API_BASE}/host/edit/${blogDataNew._id}`;
        const fetchCreateBlog = async () => {
            try {
                const response = await fetch(URL, {
                    method,
                    credentials: "include",
                    body: formData
                });
                const data= await response.json();
                if (response.ok) {
                    toast.success(data.message);
                    navigate("/host/all");
                } else {
                    toast.success("Failed to create blog.");
                }
            } catch (error) {
                toast.success( error.message);
            }
        };
        fetchCreateBlog();
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-8 bg-indigo-600 sm:p-10">
                        <h1 className="text-3xl font-extrabold text-white text-center">
                            {!isEdit ? "Create New Blog" : "Edit Blog"}
                        </h1>
                        <p className="mt-2 text-indigo-100 text-center">
                            {!isEdit 
                                ? "Share your thoughts and ideas with the world" 
                                : "Update your blog post with new content"
                            }
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleCreateBlog} className="px-6 py-8 sm:p-10 space-y-6">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter your blog title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Content Textarea */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Content
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    rows="12"
                                    placeholder="Write your blog content here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 transition-colors duration-200"
                                ></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Use markdown for formatting. Support for images coming soon!
                            </p>
                        </div>

                        {/*Upload file*/}
                        <div>
                            <input type="file" name="file" onChange={ (e)=>setFile(e.target.files[0]) } required />
                        </div>

                        {/*button*/}
                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/host/all')}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                {isEdit ? "Save Changes" : "Publish Blog"}
                            </button>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 bg-indigo-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-indigo-800">Writing Tips:</h3>
                            <ul className="mt-2 text-sm text-indigo-700 space-y-1">
                                <li>• Use clear and concise language</li>
                                <li>• Break content into small paragraphs</li>
                                <li>• Include relevant examples when possible</li>
                                <li>• Review your post before publishing</li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatedBlog;