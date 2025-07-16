import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import ServiceCard from '../Components/ServiceCard';
import {
    ScaleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    HomeIcon,
    HeartIcon,
    BriefcaseIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function Services({ services = [], settings = {} }) {
    // Icon mapping for services from database
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

    // Map services to include proper icon components
    const servicesWithIcons = services.map(service => ({
        ...service,
        icon: iconMap[service.icon] || ScaleIcon
    }));

    return (
        <Layout title="Legal Services - Comprehensive Legal Solutions">
            {/* Hero Section */}
            <section className="bg-secondary-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
                            Our Legal Services
                        </h1>
                        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                            Comprehensive legal solutions tailored to meet your specific needs.
                            From consultation to representation, we're here to help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Services */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                            Core Legal Services
                        </h2>
                        <p className="text-lg text-secondary-600">
                            Our primary areas of legal expertise and service offerings
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {servicesWithIcons.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>



            {/* Process Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                            Our Process
                        </h2>
                        <p className="text-lg text-secondary-600">
                            How we work with you to achieve the best legal outcomes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Initial Consultation',
                                description: 'We discuss your legal needs and assess your situation.'
                            },
                            {
                                step: '02',
                                title: 'Case Analysis',
                                description: 'Thorough review and analysis of your legal matter.'
                            },
                            {
                                step: '03',
                                title: 'Strategy Development',
                                description: 'Create a tailored legal strategy for your case.'
                            },
                            {
                                step: '04',
                                title: 'Implementation',
                                description: 'Execute the legal strategy and represent your interests.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-secondary-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Contact us today for a consultation and let us help you with your legal needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            Schedule Consultation
                        </Link>
                        <a
                            href="tel:+63XXXXXXXXXX"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            Call Now
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
