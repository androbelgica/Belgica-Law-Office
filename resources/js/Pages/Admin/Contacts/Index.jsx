import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    MagnifyingGlassIcon,
    EyeIcon,
    TrashIcon,
    EnvelopeIcon,
    ClockIcon,
    CheckCircleIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, contacts, filters, stats, flash }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/contacts', { search, status }, { preserveState: true });
    };

    const handleStatusFilter = (newStatus) => {
        setStatus(newStatus);
        router.get('/admin/contacts', { search, status: newStatus }, { preserveState: true });
    };

    const handleDelete = (contact) => {
        if (confirm(`Are you sure you want to delete the contact from ${contact.name}?`)) {
            router.delete(`/admin/contacts/${contact.id}`);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            unread: 'bg-red-100 text-red-800',
            read: 'bg-yellow-100 text-yellow-800',
            replied: 'bg-green-100 text-green-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'unread':
                return <EnvelopeIcon className="h-4 w-4" />;
            case 'read':
                return <EyeIcon className="h-4 w-4" />;
            case 'replied':
                return <ChatBubbleLeftRightIcon className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Contacts" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="md:flex md:items-center md:justify-between mb-6">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Contact Messages
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage contact form submissions from your website
                            </p>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <EnvelopeIcon className="h-6 w-6 text-red-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Unread</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.unread}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <EyeIcon className="h-6 w-6 text-yellow-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Read</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.read}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Replied</dt>
                                            <dd className="text-lg font-medium text-gray-900">{stats.replied}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white shadow rounded-lg mb-6">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Search */}
                                <form onSubmit={handleSearch} className="flex">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Search contacts..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Search
                                    </button>
                                </form>

                                {/* Status Filter */}
                                <div className="flex space-x-2">
                                    {[
                                        { key: 'all', label: 'All' },
                                        { key: 'unread', label: 'Unread' },
                                        { key: 'read', label: 'Read' },
                                        { key: 'replied', label: 'Replied' }
                                    ].map((filter) => (
                                        <button
                                            key={filter.key}
                                            onClick={() => handleStatusFilter(filter.key)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                status === filter.key
                                                    ? 'bg-indigo-100 text-indigo-700'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contacts List */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {contacts.data.length > 0 ? (
                                contacts.data.map((contact) => (
                                    <li key={contact.id}>
                                        <div className="px-4 py-4 flex items-center justify-between">
                                            <div className="flex items-center flex-1">
                                                <div className="flex-shrink-0 mr-4">
                                                    {getStatusIcon(contact.status)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                                            {contact.name}
                                                        </p>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contact.status)}`}>
                                                                {contact.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <p className="truncate">{contact.email}</p>
                                                            {contact.phone && (
                                                                <>
                                                                    <span className="mx-2">•</span>
                                                                    <p className="truncate">{contact.phone}</p>
                                                                </>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-900 font-medium mt-1">
                                                            {contact.subject}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                            {contact.message.substring(0, 150)}...
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            {new Date(contact.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/admin/contacts/${contact.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
                                                >
                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(contact)}
                                                    className="text-red-600 hover:text-red-900 text-sm font-medium flex items-center"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-12 text-center">
                                    <EnvelopeIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {filters.search || filters.status !== 'all' 
                                            ? 'No contacts match your current filters.' 
                                            : 'No contact messages have been received yet.'
                                        }
                                    </p>
                                </li>
                            )}
                        </ul>

                        {/* Pagination */}
                        {contacts.links && contacts.links.length > 3 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 flex justify-between sm:hidden">
                                        {contacts.prev_page_url && (
                                            <Link
                                                href={contacts.prev_page_url}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {contacts.next_page_url && (
                                            <Link
                                                href={contacts.next_page_url}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{contacts.from}</span> to{' '}
                                                <span className="font-medium">{contacts.to}</span> of{' '}
                                                <span className="font-medium">{contacts.total}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                {contacts.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                            link.active
                                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                            index === contacts.links.length - 1 ? 'rounded-r-md' : ''
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
