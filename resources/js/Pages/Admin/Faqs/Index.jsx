import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, faqs, flash }) {
    const handleDelete = (faq) => {
        if (confirm(`Are you sure you want to delete "${faq.question}"?`)) {
            router.delete(`/admin/faqs/${faq.id}`);
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'services': 'bg-blue-100 text-blue-800',
            'pricing': 'bg-green-100 text-green-800',
            'consultation': 'bg-purple-100 text-purple-800',
            'general': 'bg-gray-100 text-gray-800',
            'legal': 'bg-red-100 text-red-800',
            'process': 'bg-yellow-100 text-yellow-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const groupedFaqs = faqs.reduce((groups, faq) => {
        const category = faq.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(faq);
        return groups;
    }, {});

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage FAQs" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="md:flex md:items-center md:justify-between mb-6">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Manage FAQs
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Create and manage frequently asked questions
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link
                                href="/admin/faqs/create"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add FAQ
                            </Link>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* FAQs by Category */}
                    {Object.keys(groupedFaqs).length > 0 ? (
                        <div className="space-y-8">
                            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                                <div key={category} className="bg-white shadow rounded-lg">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-gray-900 capitalize">
                                                {category} ({categoryFaqs.length})
                                            </h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                                                {category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {categoryFaqs.map((faq) => (
                                            <div key={faq.id} className="px-6 py-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center mb-2">
                                                            <QuestionMarkCircleIcon className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                                                {faq.question}
                                                            </h4>
                                                            <div className="ml-2 flex items-center">
                                                                {faq.is_published ? (
                                                                    <CheckCircleIcon className="h-4 w-4 text-green-500" title="Published" />
                                                                ) : (
                                                                    <XCircleIcon className="h-4 w-4 text-red-500" title="Draft" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                            {faq.answer}
                                                        </p>
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <span>Sort Order: {faq.sort_order}</span>
                                                            <span className="mx-2">•</span>
                                                            <span>
                                                                {faq.is_published ? 'Published' : 'Draft'}
                                                            </span>
                                                            <span className="mx-2">•</span>
                                                            <span>
                                                                Updated {new Date(faq.updated_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex items-center space-x-2">
                                                        <Link
                                                            href={`/admin/faqs/${faq.id}`}
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
                                                        >
                                                            <EyeIcon className="h-4 w-4 mr-1" />
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={`/admin/faqs/${faq.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
                                                        >
                                                            <PencilIcon className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(faq)}
                                                            className="text-red-600 hover:text-red-900 text-sm font-medium flex items-center"
                                                        >
                                                            <TrashIcon className="h-4 w-4 mr-1" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating your first FAQ.</p>
                            <div className="mt-6">
                                <Link
                                    href="/admin/faqs/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    Add Your First FAQ
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats */}
                    {faqs.length > 0 && (
                        <div className="mt-8 bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">FAQ Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-indigo-600">{faqs.length}</div>
                                    <div className="text-sm text-gray-500">Total FAQs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {faqs.filter(faq => faq.is_published).length}
                                    </div>
                                    <div className="text-sm text-gray-500">Published</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {faqs.filter(faq => !faq.is_published).length}
                                    </div>
                                    <div className="text-sm text-gray-500">Drafts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {Object.keys(groupedFaqs).length}
                                    </div>
                                    <div className="text-sm text-gray-500">Categories</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
