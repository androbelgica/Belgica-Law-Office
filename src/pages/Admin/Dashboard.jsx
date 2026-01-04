import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    UsersIcon,
    DocumentTextIcon,
    InboxIcon,
    ArrowTrendingUpIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        inquiries: 0,
        articles: 0,
        unreadInquiries: 0,
        services: 0
    });
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Counts
                const { count: articlesCount } = await supabase
                    .from('articles')
                    .select('*', { count: 'exact', head: true });

                const { count: inquiriesCount } = await supabase
                    .from('inquiries')
                    .select('*', { count: 'exact', head: true });

                const { count: unreadCount } = await supabase
                    .from('inquiries')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'new');

                const { count: servicesCount } = await supabase
                    .from('services')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_active', true);

                // Fetch Recent Inquiries
                const { data: recentData } = await supabase
                    .from('inquiries')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setStats({
                    inquiries: inquiriesCount || 0,
                    articles: articlesCount || 0,
                    unreadInquiries: unreadCount || 0,
                    services: servicesCount || 0
                });

                if (recentData) setRecentInquiries(recentData);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color, to }) => (
        <Link to={to} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-full ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{value}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </Link>
    );

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Inquiries"
                    value={stats.inquiries}
                    icon={InboxIcon}
                    color="bg-blue-500"
                    to="/admin/inquiries"
                />
                <StatCard
                    title="Unread Messages"
                    value={stats.unreadInquiries}
                    icon={InboxIcon}
                    color="bg-amber-500"
                    to="/admin/inquiries"
                />
                <StatCard
                    title="Published Articles"
                    value={stats.articles}
                    icon={DocumentTextIcon}
                    color="bg-emerald-500"
                    to="/admin/articles"
                />
                <StatCard
                    title="Active Services"
                    value={stats.services}
                    icon={BriefcaseIcon}
                    color="bg-purple-500"
                    to="/admin/services-manager"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Inquiries</h2>
                        <Link to="/admin/inquiries" className="text-sm text-primary-600 hover:text-primary-800 font-medium">View All</Link>
                    </div>
                    <div>
                        {recentInquiries.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">No inquiries yet.</div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {recentInquiries.map((inquiry) => (
                                    <div key={inquiry.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                                                {inquiry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{inquiry.name}</p>
                                                <p className="text-xs text-gray-500">{inquiry.subject || inquiry.service_interest || 'General Inquiry'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${inquiry.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    inquiry.status === 'contacted' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                                                }`}>
                                                {inquiry.status.toUpperCase()}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(inquiry.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link to="/admin/articles" className="w-full p-4 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center group border border-gray-100">
                            <DocumentTextIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary-500 transition-colors" />
                            Write New Article
                        </Link>
                        <Link to="/admin/inquiries" className="w-full p-4 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center group border border-gray-100">
                            <InboxIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary-500 transition-colors" />
                            Check Unread Inquiries
                        </Link>
                        <Link to="/admin/services-manager" className="w-full p-4 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center group border border-gray-100">
                            <BriefcaseIcon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-primary-500 transition-colors" />
                            Update Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
