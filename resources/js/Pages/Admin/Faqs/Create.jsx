import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        category: 'general',
        sort_order: 0,
        is_published: true
    });

    const categories = [
        { value: 'general', label: 'General' },
        { value: 'services', label: 'Services' },
        { value: 'pricing', label: 'Pricing' },
        { value: 'consultation', label: 'Consultation' },
        { value: 'legal', label: 'Legal Process' },
        { value: 'process', label: 'Process & Procedures' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/faqs');
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Create FAQ" />
            
            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/admin/faqs"
                                className="mr-4 text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Create New FAQ
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            Add a new frequently asked question
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white shadow rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            {/* Question */}
                            <div>
                                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                                    Question *
                                </label>
                                <input
                                    type="text"
                                    id="question"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="What is your question?"
                                />
                                {errors.question && (
                                    <p className="mt-1 text-sm text-red-600">{errors.question}</p>
                                )}
                            </div>

                            {/* Answer */}
                            <div>
                                <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                                    Answer *
                                </label>
                                <textarea
                                    id="answer"
                                    rows={6}
                                    value={data.answer}
                                    onChange={(e) => setData('answer', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Provide a detailed answer..."
                                />
                                {errors.answer && (
                                    <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">
                                    Sort Order *
                                </label>
                                <input
                                    type="number"
                                    id="sort_order"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Lower numbers appear first
                                </p>
                                {errors.sort_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>
                                )}
                            </div>

                            {/* Published Status */}
                            <div className="flex items-center">
                                <input
                                    id="is_published"
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                                    Published (visible on website)
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Link
                                    href="/admin/faqs"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
