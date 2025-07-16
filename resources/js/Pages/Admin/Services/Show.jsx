import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { 
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function Show({ auth, service }) {
    const handleDelete = () => {
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
            <Head title={`View ${service.title}`} />
            
            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Link
                                    href="/admin/services"
                                    className="mr-4 text-gray-500 hover:text-gray-700"
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />
                                </Link>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {service.title}
                                </h2>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href={`/admin/services/${service.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PencilIcon className="-ml-1 mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <TrashIcon className="-ml-1 mr-2 h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            {/* Service Header */}
                            <div className="flex items-center mb-6">
                                <div className="text-4xl mr-4">
                                    {getIconComponent(service.icon)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {service.title}
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            {service.is_active ? (
                                                <>
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                                                    <span className="text-sm text-green-700 font-medium">Active</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircleIcon className="h-5 w-5 text-red-500 mr-1" />
                                                    <span className="text-sm text-red-700 font-medium">Inactive</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Sort Order: {service.sort_order}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Description</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Features</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {service.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 bg-blue-50 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-blue-900 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="border-t border-gray-200 pt-6">
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Service Information</h4>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(service.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(service.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Icon</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {service.icon}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                                        <dd className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                service.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-medium text-gray-900">Website Preview</h4>
                            <p className="text-sm text-gray-500">How this service appears on your website</p>
                        </div>
                        <div className="px-6 py-8 bg-gray-50">
                            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4">
                                        <span className="text-2xl">{getIconComponent(service.icon)}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {service.features.slice(0, 3).map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                                                {feature}
                                            </li>
                                        ))}
                                        {service.features.length > 3 && (
                                            <li className="text-sm text-gray-500">
                                                +{service.features.length - 3} more features
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
