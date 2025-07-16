import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    HomeIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    DocumentTextIcon,
    UserIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({ user = null, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: window.location.pathname === '/admin' },
        { name: 'Services', href: '/admin/services', icon: Cog6ToothIcon, current: window.location.pathname.startsWith('/admin/services') },
        { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon, current: window.location.pathname.startsWith('/admin/contacts') },
        { name: 'Inquiries', href: '/admin/inquiries', icon: ChatBubbleLeftRightIcon, current: window.location.pathname.startsWith('/admin/inquiries') },
        { name: 'FAQs', href: '/admin/faqs', icon: QuestionMarkCircleIcon, current: window.location.pathname.startsWith('/admin/faqs') },
        { name: 'Articles', href: '/admin/articles', icon: DocumentTextIcon, current: window.location.pathname.startsWith('/admin/articles') },
        { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, current: window.location.pathname.startsWith('/admin/settings') },
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <img
                                src="/images/logo.png"
                                alt="BelgicaLaw"
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-xl font-serif font-bold text-gray-900">
                                Admin
                            </span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`${
                                        item.current
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                                >
                                    <item.icon className="mr-4 h-6 w-6" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                src="/images/logo.png"
                                alt="BelgicaLaw"
                                className="h-8 w-auto"
                            />
                            <span className="ml-2 text-xl font-serif font-bold text-gray-900">
                                Admin
                            </span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`${
                                        item.current
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                >
                                    <item.icon className="mr-3 h-6 w-6" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-5 w-5 text-gray-600" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</p>
                                <p className="text-xs font-medium text-gray-500">{user?.email || 'admin@example.com'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                {/* Top bar */}
                <div className="bg-white shadow">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold text-gray-900">
                                    BelgicaLaw Admin Panel
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    target="_blank"
                                    className="text-gray-500 hover:text-gray-700 flex items-center"
                                >
                                    <EyeIcon className="h-5 w-5 mr-1" />
                                    View Site
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-gray-500 hover:text-gray-700 flex items-center"
                                >
                                    <UserIcon className="h-5 w-5 mr-1" />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-gray-700 flex items-center"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
