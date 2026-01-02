import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import AdminRoute from './components/AdminRoute.jsx';

import Home from './pages/Home.jsx';
import ArticleDetails from './pages/ArticleDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/articles/:id" element={<ArticleDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
