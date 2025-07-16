import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, services, flash }) {
    const handleDelete = (service) => {
        if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
            router.delete(`/admin/services/${service.id}`);
        }
    };

    const getIconComponent = (iconName) => {
        const iconMap = {
            'ScaleIcon': '⚖️',
            'DocumentTextIcon': '📄',
            'UserGroupIcon': '👥',
            'ShieldCheckIcon': '🛡️',
            'HomeIcon': '🏠',
            'HeartIcon': '❤️',
            'BriefcaseIcon': '💼',
            'BuildingOfficeIcon': '🏢'
        };
        return iconMap[iconName] || '📋';
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Manage Services" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="md:flex md:items-center md:justify-between mb-6">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Manage Services
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Add, edit, and manage your legal services
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link
                                href="/admin/services/create"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add Service
                            </Link>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white overflow-hidden shadow rounded-lg">
                                {/* Service Image */}
                                {service.image_url && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={`/storage/${service.image_url}`}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="text-2xl">
                                                {getIconComponent(service.icon)}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {service.title}
                                                </h3>
                                                <div className="flex items-center">
                                                    {service.is_active ? (
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500" title="Active" />
                                                    ) : (
                                                        <XCircleIcon className="h-5 w-5 text-red-500" title="Inactive" />
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Sort Order: {service.sort_order}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-xs text-gray-500 mb-2">Features:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {service.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {service.features.length > 3 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    +{service.features.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-3">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/admin/services/${service.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
                                            >
                                                <EyeIcon className="h-4 w-4 mr-1" />
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/services/${service.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
                                            >
                                                <PencilIcon className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(service)}
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

                    {services.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first service.</p>
                            <Link
                                href="/admin/services/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add Your First Service
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
