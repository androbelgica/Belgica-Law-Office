import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import {
    PencilSquareIcon,
    UserGroupIcon,
    CheckCircleIcon,
    XCircleIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function PersonnelManager() {
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('personnel')
                .select('*')
                .order('sort_order', { ascending: true });

            if (data && !error) setPersonnel(data);
        } catch (err) {
            console.error('Error fetching personnel:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (id, currentStatus) => {
        const { error } = await supabase
            .from('personnel')
            .update({ is_active: !currentStatus })
            .eq('id', id);

        if (!error) {
            setPersonnel(personnel.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
        } else {
            alert('Error updating status: ' + error.message);
        }
    };

    const deletePersonnel = async (id) => {
        if (!window.confirm('Are you sure you want to remove this staff member?')) return;

        const { error } = await supabase
            .from('personnel')
            .delete()
            .eq('id', id);

        if (!error) {
            setPersonnel(personnel.filter(p => p.id !== id));
        } else {
            alert('Error deleting staff member: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Personnel Management</h1>
                    <p className="text-gray-500 mt-1">Manage the staff and legal professionals displayed on the About page.</p>
                </div>
                <Link
                    to="/admin/personnel/create"
                    className="flex items-center btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Staff Member
                </Link>
            </div>

            {loading ? (
                <div className="p-12 flex justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {personnel.length > 0 ? (
                        personnel.map(member => (
                            <div key={member.id} className={`bg-white rounded-xl shadow-sm border transition-shadow hover:shadow-md flex flex-col justify-between overflow-hidden group ${member.is_active ? 'border-gray-200' : 'border-gray-200 opacity-75 bg-gray-50'}`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                            {member.image_url ? (
                                                <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <UserGroupIcon className="h-8 w-8 text-gray-400 m-4" />
                                            )}
                                        </div>
                                        <button
                                            onClick={() => toggleActive(member.id, member.is_active)}
                                            className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${member.is_active
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                        >
                                            {member.is_active ? (
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-sm font-medium text-primary-600 mb-3">{member.role}</p>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {member.bio || "No bio provided."}
                                    </p>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                                    <Link
                                        to={`/admin/personnel/edit/${member.id}`}
                                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
                                    >
                                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deletePersonnel(member.id)}
                                        className="p-2 border border-gray-300 rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors shadow-sm"
                                        title="Delete"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center">
                            <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No personnel found</h3>
                            <p className="text-gray-500">Add staff members to your database.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
