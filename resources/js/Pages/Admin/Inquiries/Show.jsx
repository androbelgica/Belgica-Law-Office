import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    ArrowLeftIcon,
    ChatBubbleLeftRightIcon,
    CalendarIcon,
    TrashIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function Show({ auth, inquiry, flash }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        admin_reply: ''
    });

    const handleReply = (e) => {
        e.preventDefault();
        post(`/admin/inquiries/${inquiry.id}`, {
            onSuccess: () => {
                reset();
                setShowReplyForm(false);
            }
        });
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete this inquiry?`)) {
            router.delete(`/admin/inquiries/${inquiry.id}`);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            unread: { bg: 'bg-red-100', text: 'text-red-800', icon: ChatBubbleLeftRightIcon },
            read: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: EyeIcon },
            replied: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircleIcon }
        };
        return badges[status] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: ClockIcon };
    };

    const statusInfo = getStatusBadge(inquiry.status);

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Inquiry from ${inquiry.name || 'Anonymous'}`} />
            
            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Link
                                    href="/admin/inquiries"
                                    className="mr-4 text-gray-500 hover:text-gray-700"
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                </Link>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Inquiry from {inquiry.name || 'Anonymous'}
                                </h2>
                            </div>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <TrashIcon className="-ml-1 mr-2 h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Inquiry Details */}
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Inquiry Information</h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                                    <statusInfo.icon className="h-3 w-3 mr-1" />
                                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="px-6 py-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {inquiry.name || (
                                            <span className="text-gray-400 italic">Anonymous</span>
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {inquiry.email ? (
                                            <a href={`mailto:${inquiry.email}`} className="text-indigo-600 hover:text-indigo-500">
                                                {inquiry.email}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 italic">Not provided</span>
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Received</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </dd>
                                </div>
                                {inquiry.ip_address && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{inquiry.ip_address}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Message</h3>
                        </div>
                        <div className="px-6 py-6">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Reply Section */}
                    {inquiry.status === 'replied' && inquiry.admin_reply ? (
                        <div className="bg-green-50 shadow rounded-lg overflow-hidden mb-6">
                            <div className="px-6 py-4 border-b border-green-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-green-900">Your Reply</h3>
                                    <span className="text-sm text-green-600">
                                        Sent {new Date(inquiry.replied_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-6">
                                <div className="prose max-w-none">
                                    <p className="text-green-800 whitespace-pre-wrap">{inquiry.admin_reply}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">Reply to Inquiry</h3>
                                    {!showReplyForm && (
                                        <button
                                            onClick={() => setShowReplyForm(true)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <PaperAirplaneIcon className="-ml-1 mr-2 h-4 w-4" />
                                            Reply
                                        </button>
                                    )}
                                </div>
                            </div>
                            {showReplyForm ? (
                                <form onSubmit={handleReply} className="px-6 py-6">
                                    <div className="mb-4">
                                        <label htmlFor="admin_reply" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Reply
                                        </label>
                                        <textarea
                                            id="admin_reply"
                                            rows={6}
                                            value={data.admin_reply}
                                            onChange={(e) => setData('admin_reply', e.target.value)}
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Type your reply here..."
                                            required
                                        />
                                        {errors.admin_reply && (
                                            <p className="mt-1 text-sm text-red-600">{errors.admin_reply}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowReplyForm(false);
                                                reset();
                                            }}
                                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {processing ? 'Sending...' : 'Send Reply'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="px-6 py-6 text-center text-gray-500">
                                    <PaperAirplaneIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reply sent yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Click the Reply button above to respond to this inquiry.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quick Actions */}
                    <div className="mt-6 flex justify-between">
                        <Link
                            href="/admin/inquiries"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <ArrowLeftIcon className="-ml-1 mr-2 h-4 w-4" />
                            Back to Inquiries
                        </Link>
                        {inquiry.email && (
                            <a
                                href={`mailto:${inquiry.email}?subject=Re: Your inquiry`}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <ChatBubbleLeftRightIcon className="-ml-1 mr-2 h-4 w-4" />
                                Reply via Email
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
