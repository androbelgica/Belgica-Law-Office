import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import {
    Cog6ToothIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function Index({ auth, settings, flash }) {
    const settingsData = {};

    // Convert settings to a flat object for the form
    Object.values(settings).flat().forEach(setting => {
        settingsData[setting.key] = setting.value || '';
    });

    const { data, setData, post, processing, errors } = useForm({
        settings: settingsData
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings');
    };

    const updateSetting = (key, value) => {
        setData('settings', {
            ...data.settings,
            [key]: value
        });
    };

    const getGroupIcon = (group) => {
        const icons = {
            general: Cog6ToothIcon,
            contact: EnvelopeIcon,
            content: DocumentTextIcon
        };
        return icons[group] || Cog6ToothIcon;
    };

    const getGroupColor = (group) => {
        const colors = {
            general: 'text-blue-600',
            contact: 'text-green-600',
            content: 'text-purple-600'
        };
        return colors[group] || 'text-gray-600';
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Settings" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Website Settings
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Configure your website's general settings and information
                        </p>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Settings Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {Object.entries(settings).map(([groupName, groupSettings]) => {
                            const GroupIcon = getGroupIcon(groupName);
                            const groupColor = getGroupColor(groupName);

                            return (
                                <div key={groupName} className="bg-white shadow rounded-lg">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <GroupIcon className={`h-6 w-6 ${groupColor} mr-3`} />
                                            <h3 className="text-lg font-medium text-gray-900 capitalize">
                                                {groupName} Settings
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="px-6 py-6 space-y-6">
                                        {groupSettings.map((setting) => (
                                            <div key={setting.key}>
                                                <label
                                                    htmlFor={setting.key}
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    {setting.description || setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </label>

                                                {setting.type === 'textarea' ? (
                                                    <textarea
                                                        id={setting.key}
                                                        rows={4}
                                                        value={data.settings[setting.key] || ''}
                                                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder={`Enter ${setting.description?.toLowerCase() || setting.key}`}
                                                    />
                                                ) : setting.type === 'boolean' ? (
                                                    <div className="mt-1">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.settings[setting.key] === '1' || data.settings[setting.key] === true}
                                                                onChange={(e) => updateSetting(setting.key, e.target.checked ? '1' : '0')}
                                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                            />
                                                            <span className="ml-2 text-sm text-gray-600">
                                                                Enable this setting
                                                            </span>
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <input
                                                        type={setting.type === 'email' ? 'email' : 'text'}
                                                        id={setting.key}
                                                        value={data.settings[setting.key] || ''}
                                                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        placeholder={
                                                            setting.key === 'office_latitude' ? 'e.g., 14.5995' :
                                                            setting.key === 'office_longitude' ? 'e.g., 120.9842' :
                                                            setting.key === 'map_zoom_level' ? 'e.g., 15 (1-20)' :
                                                            `Enter ${setting.description?.toLowerCase() || setting.key}`
                                                        }
                                                        step={setting.key.includes('latitude') || setting.key.includes('longitude') ? '0.000001' : undefined}
                                                    />
                                                )}

                                                {errors[`settings.${setting.key}`] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors[`settings.${setting.key}`]}
                                                    </p>
                                                )}

                                                {setting.description && (
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {setting.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>

                    {/* Settings Info */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Cog6ToothIcon className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    About Settings
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        These settings control various aspects of your website. Changes will be reflected
                                        immediately on your live site. Make sure to test your changes after saving.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Settings Help */}
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <MapPinIcon className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">
                                    Map Settings Help
                                </h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p className="mb-2">
                                        To find your office coordinates:
                                    </p>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>Go to <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline">Google Maps</a></li>
                                        <li>Search for your office address</li>
                                        <li>Right-click on the exact location</li>
                                        <li>Click on the coordinates that appear (e.g., "14.5995, 120.9842")</li>
                                        <li>Copy the latitude (first number) and longitude (second number)</li>
                                    </ol>
                                    <p className="mt-2">
                                        <strong>Zoom Level:</strong> Use 1-20 (1 = world view, 20 = building level). Recommended: 15-17 for office locations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
