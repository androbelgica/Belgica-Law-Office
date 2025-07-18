import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../Layouts/Layout';
import ServiceCard from '../Components/ServiceCard';
import ServiceSlider from '../Components/ServiceSlider';
import BlogSection from '../Components/BlogSection';
import AnimatedCounter from '../Components/AnimatedCounter';
import TestimonialCarousel from '../Components/TestimonialCarousel';
import {
    ScaleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    CheckCircleIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Home({ services = [], articles = [], testimonials = [], settings = {} }) {
    // Icon mapping for services from database
    const iconMap = {
        'ScaleIcon': ScaleIcon,
        'DocumentTextIcon': DocumentTextIcon,
        'UserGroupIcon': UserGroupIcon,
        'ShieldCheckIcon': ShieldCheckIcon,
    };

    // Map services to include proper icon components
    const servicesWithIcons = services.map(service => ({
        ...service,
        icon: iconMap[service.icon] || ScaleIcon
    }));

    return (
        <Layout title="Professional Legal Services in Metro Manila">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-primary-900/80 z-10"></div>
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%23334155" width="1200" height="800"/><g fill="%23475569"><rect x="100" y="200" width="80" height="120" rx="4"/><rect x="200" y="180" width="80" height="140" rx="4"/><rect x="300" y="220" width="80" height="100" rx="4"/><rect x="500" y="300" width="200" height="20" rx="10"/><rect x="500" y="340" width="150" height="20" rx="10"/><rect x="500" y="380" width="180" height="20" rx="10"/><circle cx="900" cy="250" r="60" fill="%23374151"/><rect x="850" y="320" width="100" height="8" rx="4"/><rect x="850" y="340" width="80" height="8" rx="4"/></g></svg>')`
                        }}
                    ></div>
                </div>

                <div
                    className="relative bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg.png')" }}
                >
                    {/* Optional dark overlay */}
                    <div className="absolute inset-0 bg-black/30 z-10" />

                    {/* Content */}
                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                                Professional Legal Services
                                <span className="block text-primary-200">You Can Trust</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                                Protecting your rights with integrity and professionalism.
                            </p>
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <Link
                                    href="/contact"
                                    className="bg-white text-primary-600 hover:bg-primary-50 hover:scale-105 font-semibold py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg"
                                >
                                    For Consultation
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/services"
                                    className="border-2 border-white text-white hover:bg-white hover:text-primary-600 hover:scale-105 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg"
                                >
                                    View Services
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>


                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-sm mb-2">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Services Slider Section */}
            <ServiceSlider services={services} />

            {/* Blog Section */}
            <BlogSection articles={articles} />

            {/* Stats Section */}
            <section className="py-20 bg-primary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Trusted by Many
                        </h2>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            Years of experience serving clients across Metro Manila
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <AnimatedCounter
                                end={15}
                                suffix="+"
                                title="Years Experience"
                                description="Serving clients with dedication"
                            />
                        </div>
                        <div className="text-center">
                            <AnimatedCounter
                                end={500}
                                suffix="+"
                                title="Happy Clients"
                                description="Satisfied with our services"
                            />
                        </div>
                        <div className="text-center">
                            <AnimatedCounter
                                end={1200}
                                suffix="+"
                                title="Documents Notarized"
                                description="Professional notarial services"
                            />
                        </div>
                        <div className="text-center">
                            <AnimatedCounter
                                end={98}
                                suffix="%"
                                title="Success Rate"
                                description="In legal consultations"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-6">
                                Why Choose BelgicaLaw?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    'Experienced legal professionals',
                                    'Personalized attention to each case',
                                    'Transparent and fair pricing',
                                    'Quick response and reliable service',
                                    'Comprehensive legal solutions'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckCircleIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                                        <span className="text-secondary-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                                Ready to Get Started?
                            </h3>
                            <p className="text-secondary-600 mb-6">
                                Contact us today for a free consultation and let us help you with your legal needs.
                            </p>
                            <Link
                                href="/contact"
                                className="btn-primary w-full text-center block"
                            >
                                Schedule Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-secondary-600">
                            Hear from those who have trusted us with their legal needs
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <TestimonialCarousel testimonials={testimonials} />
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
