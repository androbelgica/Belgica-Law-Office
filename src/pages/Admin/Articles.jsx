import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    DocumentTextIcon,
    CalendarIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data && !error) setArticles(data);
        setLoading(false);
    };

    const deleteArticle = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (!error) {
            setArticles(articles.filter(a => a.id !== id));
        } else {
            alert('Error deleting article: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Articles</h1>
                    <p className="text-gray-500 mt-1">Manage your blog content and publications.</p>
                </div>
                <button
                    onClick={() => alert("Create Article functionality coming soon via a separate page!")}
                    className="flex items-center btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Article
                </button>
            </div>

            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Article Details
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th scope="col" className="relative px-6 py-4">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {articles.length > 0 ? (
                                    articles.map((article) => (
                                        <tr key={article.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
                                                        <DocumentTextIcon className="h-6 w-6" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900 line-clamp-1 max-w-xs">{article.title}</div>
                                                        <div className="text-xs text-gray-500 flex items-center mt-0.5">
                                                            <EyeIcon className="h-3 w-3 mr-1" />
                                                            {article.views || 0} views
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full bg-gray-100 text-gray-800 capitalize border border-gray-200">
                                                    {article.category || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {article.published_at ? (
                                                    <span className="px-2.5 py-0.5 inline-flex text-xs font-bold rounded-full bg-green-50 text-green-700 border border-green-100">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2.5 py-0.5 inline-flex text-xs font-bold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <CalendarIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                                    {article.published_at
                                                        ? new Date(article.published_at).toLocaleDateString()
                                                        : <span className="text-gray-400 italic">Not set</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="text-primary-600 hover:text-primary-900 p-1 hover:bg-primary-50 rounded">
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteArticle(article.id)}
                                                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-3" />
                                                <p className="text-lg font-medium text-gray-900">No articles found</p>
                                                <p className="text-sm">Get started by creating your first blog post.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
