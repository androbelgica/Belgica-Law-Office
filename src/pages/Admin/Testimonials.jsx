import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ChatBubbleBottomCenterTextIcon,
    StarIcon
} from '@heroicons/react/24/outline';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (data && !error) setTestimonials(data);
        setLoading(false);
    };

    const deleteTestimonial = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);

        if (!error) {
            setTestimonials(testimonials.filter(t => t.id !== id));
        } else {
            alert('Error deleting testimonial: ' + error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Testimonials</h1>
                    <p className="text-gray-500 mt-1">Manage client reviews and feedback.</p>
                </div>
                <Link
                    to="/admin/testimonials/create"
                    className="flex items-center btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Testimonial
                </Link>
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
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Content</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {testimonials.length > 0 ? (
                                    testimonials.map((testimonial) => (
                                        <tr key={testimonial.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                                                        <div className="text-xs text-gray-500">{testimonial.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{testimonial.content}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                                    <span className="text-sm font-medium text-gray-900">{testimonial.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${testimonial.is_active
                                                        ? 'bg-green-50 text-green-700 border border-green-100'
                                                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                    }`}>
                                                    {testimonial.is_active ? 'Active' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/admin/testimonials/edit/${testimonial.id}`}
                                                        className="text-primary-600 hover:text-primary-900 p-1 hover:bg-primary-50 rounded"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteTestimonial(testimonial.id)}
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
                                                <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-gray-300 mb-3" />
                                                <p className="text-lg font-medium text-gray-900">No testimonials yet</p>
                                                <p className="text-sm">Add your first client review.</p>
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
