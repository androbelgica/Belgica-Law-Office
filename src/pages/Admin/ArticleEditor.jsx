import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

export default function ArticleEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Legal News',
        featured_image: '',
        is_featured: false,
        published_at: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
        tags: '',
        status: 'draft' // Helper for UI, maps to published_at logic
    });

    useEffect(() => {
        if (isEditing) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching article:', error);
            navigate('/admin/articles');
            return;
        }

        if (data) {
            setFormData({
                ...data,
                tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
                published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : '',
                status: data.published_at ? 'published' : 'draft'
            });
        }
        setInitialLoading(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const updates = {
                [name]: type === 'checkbox' ? checked : value
            };

            // Auto-generate slug from title if creating and slug is untouched or matches old title slug
            if (name === 'title' && !isEditing && (!prev.slug || prev.slug === slugify(prev.title))) {
                updates.slug = slugify(value);
            }

            return { ...prev, ...updates };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare data for submission
            const submissionData = {
                title: formData.title,
                slug: formData.slug || slugify(formData.title),
                excerpt: formData.excerpt,
                content: formData.content,
                category: formData.category,
                featured_image: formData.featured_image,
                is_featured: formData.is_featured,
                published_at: formData.status === 'published' ? (formData.published_at || new Date().toISOString()) : null,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            };

            // Get current user for author_id
            const { data: { user } } = await supabase.auth.getUser();
            if (user) submissionData.author_id = user.id;

            let error;
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('articles')
                    .update({ ...submissionData, updated_at: new Date().toISOString() })
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('articles')
                    .insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;

            navigate('/admin/articles');
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Error saving article: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/articles')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                    </button>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">
                        {isEditing ? 'Edit Article' : 'New Article'}
                    </h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/articles')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 flex items-center"
                    >
                        {loading ? 'Saving...' : 'Save Article'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="Enter article title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    /blog/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="flex-1 min-w-0 block w-full px-4 py-2 rounded-none rounded-r-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="article-slug"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML/Markdown)</label>
                            <textarea
                                name="content"
                                rows={15}
                                value={formData.content}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow font-mono text-sm"
                                placeholder="Write your article content here..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                            <textarea
                                name="excerpt"
                                rows={3}
                                value={formData.excerpt}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="Short summary for preview cards..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        {formData.status === 'published' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                                <input
                                    type="datetime-local"
                                    name="published_at"
                                    value={formData.published_at}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="Legal News">Legal News</option>
                                <option value="Case Study">Case Study</option>
                                <option value="Advice">Advice</option>
                                <option value="Firm Update">Firm Update</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="featured_image"
                                    value={formData.featured_image}
                                    onChange={handleChange}
                                    className="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 px-3 py-2 sm:text-sm focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="https://"
                                />
                                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <PhotoIcon className="h-5 w-5" />
                                </span>
                            </div>
                            {formData.featured_image && (
                                <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden bg-gray-100">
                                    <img src={formData.featured_image} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                                Feature on Homepage
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="law, tech, update"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
