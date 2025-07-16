import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { 
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    EyeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, stats, recent_contacts, recent_inquiries }) {
    const statCards = [
        {
            title: 'Total Contacts',
            value: stats.total_contacts,
            unread: stats.unread_contacts,
            icon: EnvelopeIcon,
            color: 'bg-blue-500',
            href: '/admin/contacts'
        },
        {
            title: 'Total Inquiries',
            value: stats.total_inquiries,
            unread: stats.unread_inquiries,
            icon: ChatBubbleLeftRightIcon,
            color: 'bg-green-500',
            href: '/admin/inquiries'
        },
        {
            title: 'Services',
            value: stats.total_services,
            active: stats.active_services,
            icon: Cog6ToothIcon,
            color: 'bg-purple-500',
            href: '/admin/services'
        },
        {
            title: 'FAQs',
            value: stats.total_faqs,
            published: stats.published_faqs,
            icon: QuestionMarkCircleIcon,
            color: 'bg-orange-500',
            href: '/admin/faqs'
        }
    ];

    return (
        <AdminLayout user={auth.user}>
            <Head title="Admin Dashboard" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's what's happening with your BelgicaLaw website today.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat, index) => (
                            <Link
                                key={index}
                                href={stat.href}
                                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className={`${stat.color} p-3 rounded-md`}>
                                                <stat.icon className="h-6 w-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    {stat.title}
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900">
                                                    {stat.value}
                                                </dd>
                                                {stat.unread > 0 && (
                                                    <dd className="text-sm text-red-600">
                                                        {stat.unread} unread
                                                    </dd>
                                                )}
                                                {stat.active !== undefined && (
                                                    <dd className="text-sm text-green-600">
                                                        {stat.active} active
                                                    </dd>
                                                )}
                                                {stat.published !== undefined && (
                                                    <dd className="text-sm text-green-600">
                                                        {stat.published} published
                                                    </dd>
                                                )}
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Contacts */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                                    Recent Contacts
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recent_contacts.length > 0 ? (
                                    recent_contacts.map((contact) => (
                                        <div key={contact.id} className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {contact.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {contact.subject}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(contact.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {contact.status === 'unread' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Unread
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={`/admin/contacts/${contact.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-center text-gray-500">
                                        No recent contacts
                                    </div>
                                )}
                            </div>
                            <div className="px-6 py-3 bg-gray-50">
                                <Link
                                    href="/admin/contacts"
                                    className="text-sm text-indigo-600 hover:text-indigo-900"
                                >
                                    View all contacts →
                                </Link>
                            </div>
                        </div>

                        {/* Recent Inquiries */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                    Recent Inquiries
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recent_inquiries.length > 0 ? (
                                    recent_inquiries.map((inquiry) => (
                                        <div key={inquiry.id} className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {inquiry.name || 'Anonymous'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {inquiry.message.substring(0, 50)}...
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {new Date(inquiry.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {inquiry.status === 'unread' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Unread
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={`/admin/inquiries/${inquiry.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-4 text-center text-gray-500">
                                        No recent inquiries
                                    </div>
                                )}
                            </div>
                            <div className="px-6 py-3 bg-gray-50">
                                <Link
                                    href="/admin/inquiries"
                                    className="text-sm text-indigo-600 hover:text-indigo-900"
                                >
                                    View all inquiries →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href="/admin/services/create"
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                            >
                                <Cog6ToothIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-900">Add New Service</p>
                            </Link>
                            <Link
                                href="/admin/faqs/create"
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                            >
                                <QuestionMarkCircleIcon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-900">Add New FAQ</p>
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-center"
                            >
                                <DocumentTextIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-900">Update Settings</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
