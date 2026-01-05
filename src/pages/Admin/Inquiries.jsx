import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    TrashIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    InboxIcon,
    EnvelopeIcon,
    PhoneIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

export default function Inquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (data && !error) setInquiries(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const markAsRead = async (id) => {
        const { error } = await supabase
            .from('inquiries')
            .update({ status: 'read' })
            .eq('id', id);

        if (!error) {
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i));
        }
    };

    const markAsContacted = async (id) => {
        const { error } = await supabase
            .from('inquiries')
            .update({ status: 'contacted' })
            .eq('id', id);

        if (!error) {
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'contacted' } : i));
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

        const { error } = await supabase
            .from('inquiries')
            .delete()
            .eq('id', id);

        if (!error) {
            setInquiries(inquiries.filter(i => i.id !== id));
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch = inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
            inquiry.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || inquiry.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Inquiries</h1>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <div className="relative flex-1 sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search name or email..."
                            className="block w-full pl-10 pr-3 py-2 border-none rounded-md leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                    <select
                        className="block w-full sm:w-32 py-2 pl-3 pr-8 text-base border-none focus:outline-none focus:ring-0 sm:text-sm bg-transparent cursor-pointer font-medium text-gray-700"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="contacted">Contacted</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
                {loading ? (
                    <div className="p-12 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiry) => (
                                <li key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {inquiry.name}
                                                    </h3>
                                                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wide border ${inquiry.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        inquiry.status === 'read' ? 'bg-gray-50 text-gray-700 border-gray-100' :
                                                            'bg-green-50 text-green-700 border-green-100'
                                                        }`}>
                                                        {inquiry.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-400 flex items-center">
                                                    <CalendarIcon className="h-4 w-4 mr-1.5" />
                                                    {new Date(inquiry.created_at).toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                                                    {inquiry.email}
                                                </div>
                                                {inquiry.phone && (
                                                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                                        <PhoneIcon className="h-4 w-4 mr-2" />
                                                        {inquiry.phone}
                                                    </div>
                                                )}
                                                <div className="flex items-center bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium border border-primary-100">
                                                    {inquiry.service_interest}
                                                </div>
                                            </div>

                                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm leading-relaxed">
                                                "{inquiry.message}"
                                            </p>
                                        </div>

                                        <div className="flex md:flex-col gap-2 justify-start md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                                            {inquiry.status !== 'contacted' && (
                                                <button
                                                    onClick={() => markAsContacted(inquiry.id)}
                                                    className="flex items-center justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none transition-all w-full"
                                                >
                                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                                    Mark Contacted
                                                </button>
                                            )}
                                            {inquiry.status === 'new' && (
                                                <button
                                                    onClick={() => markAsRead(inquiry.id)}
                                                    className="flex items-center justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-green-600 hover:border-green-200 focus:outline-none transition-all w-full"
                                                >
                                                    <InboxIcon className="h-4 w-4 mr-2" />
                                                    Mark Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteInquiry(inquiry.id)}
                                                className="flex items-center justify-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 focus:outline-none transition-all w-full"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-gray-50 p-4 rounded-full mb-4">
                                    <InboxIcon className="h-12 w-12 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No inquiries found</h3>
                                <p className="text-gray-500 mt-1">Try adjusting your filters or search.</p>
                            </div>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
