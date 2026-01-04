import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PencilIcon,
    EyeIcon,
    CalendarIcon,
    ClockIcon,
    TagIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function Show({ auth, article }) {
    const getStatusBadge = (status) => {
        const badges = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Article: ${article.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link
                                    href="/admin/articles"
                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
                                >
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Back to Articles
                                </Link>
                                <h1 className="text-3xl font-bold text-gray-900">Article Preview</h1>
                                <p className="mt-2 text-gray-600">Review your article before publishing</p>
                            </div>
                            <div className="flex space-x-3">
                                {article.status === 'published' && (
                                    <a
                                        href={`/blog/${article.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <GlobeAltIcon className="h-4 w-4 mr-2" />
                                        View Live
                                    </a>
                                )}
                                <Link
                                    href={`/admin/articles/${article.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    Edit Article
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Article Meta */}
                    <div className="bg-white shadow rounded-lg mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Article Information</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                    <div className="mt-1 flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                                            {article.status}
                                        </span>
                                        {article.is_featured && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Published Date</h3>
                                    <div className="mt-1 flex items-center text-sm text-gray-900">
                                        <CalendarIcon className="h-4 w-4 mr-1" />
                                        {article.formatted_published_at || 'Not published'}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Read Time & Views</h3>
                                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {article.read_time} min read
                                        </div>
                                        <div className="flex items-center">
                                            <EyeIcon className="h-4 w-4 mr-1" />
                                            {article.views} views
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="text-sm font-medium text-gray-500">URL Slug</h3>
                                    <p className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                                        /blog/{article.slug}
                                    </p>
                                </div>

                                {article.tags && article.tags.length > 0 && (
                                    <div className="md:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {article.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                >
                                                    <TagIcon className="h-3 w-3 mr-1" />
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SEO Information */}
                    <div className="bg-white shadow rounded-lg mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">SEO Information</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Meta Title</h3>
                                <p className="mt-1 text-sm text-gray-900">
                                    {article.meta_title || article.title}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Meta Description</h3>
                                <p className="mt-1 text-sm text-gray-900">
                                    {article.meta_description || article.excerpt}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Article Content</h2>
                        </div>
                        <div className="p-6">
                            {/* Featured Image */}
                            {article.featured_image && (
                                <div className="mb-8">
                                    <img
                                        src={`/storage/${article.featured_image}`}
                                        alt={article.title}
                                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                                {article.title}
                            </h1>

                            {/* Excerpt */}
                            {article.excerpt && (
                                <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Excerpt</h3>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            <div className="prose prose-lg max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                    className="text-gray-700 leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-between">
                        <Link
                            href="/admin/articles"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Back to Articles
                        </Link>

                        <div className="flex space-x-3">
                            {article.status === 'published' && (
                                <a
                                    href={`/blog/${article.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <GlobeAltIcon className="h-4 w-4 mr-2" />
                                    View Live Article
                                </a>
                            )}
                            <Link
                                href={`/admin/articles/${article.id}/edit`}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Edit Article
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
