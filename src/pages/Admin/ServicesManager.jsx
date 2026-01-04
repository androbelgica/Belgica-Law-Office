import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    PencilSquareIcon,
    BriefcaseIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function ServicesManager() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('title', { ascending: true });

        if (data && !error) setServices(data);
        setLoading(false);
    };

    const toggleActive = async (id, currentStatus) => {
        const { error } = await supabase
            .from('services')
            .update({ is_active: !currentStatus })
            .eq('id', id);

        if (!error) {
            setServices(services.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s));
        } else {
            alert('Error updating service: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Services Management</h1>
                <p className="text-gray-500 mt-1">Manage, update, or toggle the visibility of your legal service offerings.</p>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.length > 0 ? (
                        services.map(service => (
                            <div key={service.id} className={`bg-white rounded-xl shadow-sm border transition-shadow hover:shadow-md flex flex-col justify-between overflow-hidden group ${service.is_active ? 'border-gray-200' : 'border-gray-200 opacity-75 bg-gray-50'}`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                                            <BriefcaseIcon className="h-6 w-6" />
                                        </div>
                                        <button
                                            onClick={() => toggleActive(service.id, service.is_active)}
                                            className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${service.is_active
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                        >
                                            {service.is_active ? (
                                                <>
                                                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <XCircleIcon className="h-3 w-3 mr-1" />
                                                    Inactive
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3">
                                        {service.description || "No description provided."}
                                    </p>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                                    <button
                                        onClick={() => alert('Edit functionality coming soon!')}
                                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <BriefcaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No services found</h3>
                            <p className="text-gray-500">Add services to your database.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
