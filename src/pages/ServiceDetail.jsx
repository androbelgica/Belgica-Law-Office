import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { supabase } from '../lib/supabase';
import {
    ScaleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    HomeIcon,
    HeartIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    // Icon mapping
    const iconMap = {
        'ScaleIcon': ScaleIcon,
        'DocumentTextIcon': DocumentTextIcon,
        'UserGroupIcon': UserGroupIcon,
        'ShieldCheckIcon': ShieldCheckIcon,
        'HomeIcon': HomeIcon,
        'HeartIcon': HeartIcon,
        'BriefcaseIcon': BriefcaseIcon,
        'BuildingOfficeIcon': BuildingOfficeIcon,
    };

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('slug', slug)
                    .eq('is_active', true)
                    .single();

                if (error) throw error;
                setService(data);
            } catch (error) {
                console.error('Error fetching service:', error);
                setService(null);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchService();
        }
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </Layout>
        );
    }

    if (!service) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
                        <Link to="/services" className="text-primary-600 hover:underline mt-4 block">
                            Back to Services
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const Icon = iconMap[service.icon] || ScaleIcon;

    return (
        <Layout title={`${service.title} - BelgicaLaw`}>
            {/* Hero Section */}
            <div className="relative h-96">
                <div className="absolute inset-0">
                    <img
                        src={service.image_url || '/images/bg.png'}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                    <Link to="/services" className="text-white/80 hover:text-white flex items-center mb-6 group w-fit">
                        <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary-600 rounded-lg mr-4">
                            <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            {service.title}
                        </h1>
                    </div>
                    <p className="text-xl text-gray-200 max-w-2xl md:ml-20">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-6">
                                Overview
                            </h2>
                            <div className="prose prose-lg text-secondary-600 mb-8 whitespace-pre-line">
                                {service.long_description}
                            </div>

                            {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                                        What We Offer
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.features.map((feature, index) => (
                                            <div key={index} className="flex items-start p-4 bg-secondary-50 rounded-lg">
                                                <CheckCircleIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                                                <span className="font-medium text-secondary-900">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-secondary-50 p-8 rounded-xl sticky top-24">
                                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                                    Need Legal Assistance?
                                </h3>
                                <p className="text-secondary-600 mb-6">
                                    Contact us today to schedule a consultation regarding your {service.title.toLowerCase()} needs.
                                </p>
                                <Link
                                    to="/contact"
                                    className="block w-full text-center btn-primary mb-4 py-3"
                                >
                                    Book an Appointment
                                </Link>
                                <a
                                    href="tel:+63XXXXXXXXXX"
                                    className="block w-full text-center border-2 border-primary-600 text-primary-600 font-semibold py-2 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    Call Us Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

