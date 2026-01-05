import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeftIcon, PhotoIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export default function ServiceEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        long_description: '',
        icon: 'ScaleIcon', // Default
        image_url: '',
        features: '', // We'll manage this as newline separated string
        is_active: true
    });

    useEffect(() => {
        if (isEditing) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching service:', error);
            navigate('/admin/services-manager');
            return;
        }

        if (data) {
            setFormData({
                ...data,
                features: Array.isArray(data.features) ? data.features.join('\n') : '',
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
            const submissionData = {
                title: formData.title,
                slug: formData.slug || slugify(formData.title),
                description: formData.description,
                long_description: formData.long_description,
                icon: formData.icon,
                image_url: formData.image_url,
                features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
                is_active: formData.is_active
            };

            let error;
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('services')
                    .update({ ...submissionData, updated_at: new Date().toISOString() })
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('services')
                    .insert([submissionData]);
                error = insertError;
            }

            if (error) throw error;

            navigate('/admin/services-manager');
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service: ' + error.message);
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
                        onClick={() => navigate('/admin/services-manager')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                    </button>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">
                        {isEditing ? 'Edit Service' : 'New Service'}
                    </h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/services-manager')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 flex items-center"
                    >
                        {loading ? 'Saving...' : 'Save Service'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="e.g. Civil Litigation"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    /services/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="flex-1 min-w-0 block w-full px-4 py-2 rounded-none rounded-r-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="civil-litigation"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (for cards)</label>
                            <textarea
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="Brief overview..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Long Description (HTML/Markdown)</label>
                            <textarea
                                name="long_description"
                                rows={10}
                                value={formData.long_description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow font-mono text-sm"
                                placeholder="Detailed service explanation..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features (one per line)</label>
                            <textarea
                                name="features"
                                rows={5}
                                value={formData.features}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="Initial consultation&#10;Document review&#10;Court representation"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Options */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Active (Visible to public)
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 px-3 py-2 sm:text-sm focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="https://"
                                />
                                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <PhotoIcon className="h-5 w-5" />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Heroicons)</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="flex-1 block w-full rounded-none rounded-l-md border border-gray-300 px-3 py-2 sm:text-sm focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="e.g. ScaleIcon"
                                />
                                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <BriefcaseIcon className="h-5 w-5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
