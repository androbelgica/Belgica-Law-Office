import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    HomeIcon,
    DocumentTextIcon,
    InboxIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center px-4 py-3 mx-3 my-1 text-base font-medium rounded-lg transition-all duration-200 group ${active
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-gray-300 hover:bg-secondary-800 hover:text-white'
            }`}
    >
        <Icon className={`h-6 w-6 mr-3 flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
        <span>{label}</span>
    </Link>
);

export default function AdminLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-secondary-900 text-white transition-transform duration-300 ease-in-out transform lg:relative lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between h-16 px-6 bg-secondary-800 border-b border-secondary-700">
                    <span className="text-xl font-bold font-serif">BelgicaLaw Admin</span>
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6 flex-1">
                    <SidebarItem
                        to="/admin/dashboard"
                        icon={HomeIcon}
                        label="Dashboard"
                        active={location.pathname === '/admin/dashboard'}
                    />
                    <SidebarItem
                        to="/admin/inquiries"
                        icon={InboxIcon}
                        label="Inquiries"
                        active={location.pathname === '/admin/inquiries'}
                    />
                    <SidebarItem
                        to="/admin/articles"
                        icon={DocumentTextIcon}
                        label="Articles"
                        active={location.pathname === '/admin/articles'}
                    />
                    <SidebarItem
                        to="/admin/services-manager"
                        icon={BuildingOfficeIcon}
                        label="Services"
                        active={location.pathname.startsWith('/admin/services-manager')}
                    />
                    <SidebarItem
                        to="/admin/personnel"
                        icon={UserGroupIcon}
                        label="Staff/Personnel"
                        active={location.pathname.startsWith('/admin/personnel')}
                    />
                    <SidebarItem
                        to="/admin/testimonials"
                        icon={ChatBubbleLeftRightIcon}
                        label="Testimonials"
                        active={location.pathname.startsWith('/admin/testimonials')}
                    />
                </nav>

                <div className="p-4 border-t border-secondary-800/50">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-3 mx-auto text-base font-medium text-gray-300 rounded-lg hover:bg-red-900/30 hover:text-red-400 transition-all duration-200 group"
                    >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3 group-hover:text-red-400 transition-colors" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-bold text-gray-900">BelgicaLaw Admin</span>
                    <div className="w-6"></div> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
