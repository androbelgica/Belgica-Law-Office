import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/outline';
import ImageUpload from '../../components/ImageUpload';

export default function PersonnelEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditing);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image_url: '',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        if (isEditing) {
            fetchMember();
        }
    }, [id]);

    const fetchMember = async () => {
        const { data, error } = await supabase
            .from('personnel')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching staff member:', error);
            navigate('/admin/personnel');
            return;
        }

        if (data) {
            setFormData(data);
        }
        setInitialLoading(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submissionData = {
                ...formData,
                updated_at: new Date().toISOString()
            };

            let error;
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('personnel')
                    .update(submissionData)
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('personnel')
                    .insert([formData]);
                error = insertError;
            }

            if (error) throw error;

            navigate('/admin/personnel');
        } catch (error) {
            console.error('Error saving staff member:', error);
            alert('Error saving staff member: ' + error.message);
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
                        onClick={() => navigate('/admin/personnel')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                    </button>
                    <h1 className="text-2xl font-serif font-bold text-gray-900">
                        {isEditing ? 'Edit Staff Member' : 'Add Staff Member'}
                    </h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/personnel')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 flex items-center"
                    >
                        {loading ? 'Saving...' : 'Save Member'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="e.g. Atty. Juan Dela Cruz"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="e.g. Senior Associate"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brief Bio</label>
                            <textarea
                                name="bio"
                                rows={5}
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="Write a short professional background..."
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
                        <ImageUpload 
                            label="Photo"
                            defaultValue={formData.image_url}
                            onUpload={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                            <input
                                type="number"
                                name="sort_order"
                                value={formData.sort_order}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                                placeholder="0"
                            />
                            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first.</p>
                        </div>

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
                                Active (Visible on About page)
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
