import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Inquiries from './pages/Admin/Inquiries';
import Articles from './pages/Admin/Articles';
import ArticleEditor from './pages/Admin/ArticleEditor';
import ServicesManager from './pages/Admin/ServicesManager';
import ServiceEditor from './pages/Admin/ServiceEditor';
import PersonnelManager from './pages/Admin/PersonnelManager';
import PersonnelEditor from './pages/Admin/PersonnelEditor';
import { Navigate } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="inquiries" element={<Inquiries />} />

                    <Route path="articles" element={<Articles />} />
                    <Route path="articles/create" element={<ArticleEditor />} />
                    <Route path="articles/edit/:id" element={<ArticleEditor />} />

                    <Route path="services-manager" element={<ServicesManager />} />
                    <Route path="services-manager/create" element={<ServiceEditor />} />
                    <Route path="services-manager/edit/:id" element={<ServiceEditor />} />

                    <Route path="personnel" element={<PersonnelManager />} />
                    <Route path="personnel/create" element={<PersonnelEditor />} />
                    <Route path="personnel/edit/:id" element={<PersonnelEditor />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
