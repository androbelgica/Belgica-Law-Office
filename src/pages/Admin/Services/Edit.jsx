import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import {
    ArrowLeftIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function Edit({ auth, service }) {
    const { data, setData, post, processing, errors } = useForm({
        title: service.title || '',
        description: service.description || '',
        features: service.features || [''],
        icon: service.icon || 'ScaleIcon',
        image: null,
        sort_order: service.sort_order || 0,
        is_active: service.is_active ?? true,
        _method: 'PUT'
    });

    const iconOptions = [
        { value: 'ScaleIcon', label: '⚖️ Scale (Legal)' },
        { value: 'DocumentTextIcon', label: '📄 Document' },
        { value: 'UserGroupIcon', label: '👥 User Group' },
        { value: 'ShieldCheckIcon', label: '🛡️ Shield (Protection)' },
        { value: 'HomeIcon', label: '🏠 Home (Real Estate)' },
        { value: 'HeartIcon', label: '❤️ Heart (Family)' },
        { value: 'BriefcaseIcon', label: '💼 Briefcase (Business)' },
        { value: 'BuildingOfficeIcon', label: '🏢 Building (Corporate)' }
    ];

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/services/${service.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit ${service.title}`} />

            <div className="py-6">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/admin/services"
                                className="mr-4 text-gray-500 hover:text-gray-700"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Edit Service: {service.title}
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            Update the service information
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white shadow rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Service Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="e.g., Legal Consultation"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Describe this service..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Icon */}
                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                                    Icon *
                                </label>
                                <select
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {iconOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.icon && (
                                    <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
                                )}
                            </div>

                            {/* Service Image */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Service Image
                                </label>

                                {/* Current Image Preview */}
                                {service.image_url && (
                                    <div className="mt-2 mb-4">
                                        <p className="text-sm text-gray-600 mb-2">Current image:</p>
                                        <img
                                            src={`/storage/${service.image_url}`}
                                            alt={service.title}
                                            className="w-32 h-24 object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}

                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Upload a new image to replace the current one. Recommended size: 800x600px. Max size: 2MB.
                                </p>
                            </div>

                            {/* Features */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Features *
                                </label>
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter a feature..."
                                        />
                                        {data.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Add Feature
                                </button>
                                {errors.features && (
                                    <p className="mt-1 text-sm text-red-600">{errors.features}</p>
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
                                {errors.sort_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>
                                )}
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                    Active (visible on website)
                                </label>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Link
                                    href="/admin/services"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
