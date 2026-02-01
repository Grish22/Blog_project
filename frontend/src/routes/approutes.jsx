import React from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/homes";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Layout from "./layouts";
import CreatedBlog from "../pages/createdblog";
import Hostblog from "../pages/hostblog";
import Viewblog  from "../pages/viewblog";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Description from "../pages/description"
const router=createBrowserRouter(
        createRoutesFromElements(
        <Route path="/" element={<  Layout />}>
            
            <Route path="" element={< Home />} />
            
            <Route path="login" element={< Login />} />
            <Route path="signup" element={< Signup />} />
            <Route path="host/create" element={
                <ProtectedRoute>
                    <CreatedBlog />
                </ProtectedRoute>

            } />
            <Route path="host/all" element={
                <ProtectedRoute>
                    < Hostblog/>
                </ProtectedRoute>

            } />
            <Route path="user/all" element={
                <ProtectedRoute>
                    <Viewblog />
                </ProtectedRoute>

            } />
             <Route path="/user/all/:id" element={
                <ProtectedRoute>
                    <Description />
                </ProtectedRoute>
            } />
        </Route>)
    );

export default router;
