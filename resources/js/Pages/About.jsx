import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import {
    AcademicCapIcon,
    ScaleIcon,
    TrophyIcon,
    UsersIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function About({ settings = {} }) {
    const qualifications = [
        'Licensed Attorney in the Philippines',
        'Member of the Integrated Bar of the Philippines',
        'Notary Public Commission',
        'Bachelor of Laws (LL.B.)',
        'Years of Legal Practice Experience'
    ];

    const practiceAreas = [
        'Civil Law',
        'Corporate Law',
        'Contract Law',
        'Real Estate Law',
        'Family Law',
        'Labor Law'
    ];

    return (
        <Layout title="About - Professional Legal Background">
            {/* Hero Section */}
            <section className="bg-secondary-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
                            Atty. Andrew A. Belgica
                        </h1>
                        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                            Dedicated to providing exceptional legal services with integrity,
                            professionalism, and a commitment to client success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Profile Image Placeholder */}
                        <div className="lg:col-span-1">
                            <div className="bg-secondary-200 rounded-lg h-96 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-white text-3xl font-bold">B</span>
                                    </div>
                                    <p className="text-secondary-600">Professional Photo</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-6">
                                Professional Background
                            </h2>

                            <div className="prose prose-lg text-secondary-700 mb-8">
                                <p className="mb-4">
                                    {settings.about_content || 'Welcome to BelgicaLaw, where legal expertise meets personalized service. With years of experience in the Philippine legal system, we are committed to providing comprehensive legal solutions tailored to meet the unique needs of our clients.'}
                                </p>

                                <p className="mb-4">
                                    Our practice focuses on delivering reliable legal counsel across various
                                    areas of law, ensuring that every client receives the attention and
                                    expertise they deserve. We believe in building lasting relationships
                                    based on trust, transparency, and results.
                                </p>

                                <p>
                                    Whether you're an individual seeking legal guidance or a business
                                    requiring comprehensive legal support, we are here to guide you
                                    through every step of the legal process with confidence and clarity.
                                </p>
                            </div>

                            {/* Call to Action */}
                            <div className="bg-primary-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                                    Ready to Discuss Your Legal Needs?
                                </h3>
                                <p className="text-secondary-600 mb-4">
                                    Schedule a consultation today and let us help you navigate your legal challenges.
                                </p>
                                <Link
                                    href="/contact"
                                    className="btn-primary"
                                >
                                    Schedule Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Qualifications & Experience */}
            <section className="py-16 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Qualifications */}
                        <div>
                            <div className="flex items-center mb-6">
                                <AcademicCapIcon className="h-8 w-8 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-serif font-bold text-secondary-900">
                                    Qualifications & Credentials
                                </h2>
                            </div>
                            <ul className="space-y-3">
                                {qualifications.map((qualification, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                                        <span className="text-secondary-700">{qualification}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Practice Areas */}
                        <div>
                            <div className="flex items-center mb-6">
                                <ScaleIcon className="h-8 w-8 text-primary-600 mr-3" />
                                <h2 className="text-2xl font-serif font-bold text-secondary-900">
                                    Areas of Practice
                                </h2>
                            </div>
                            <ul className="space-y-3">
                                {practiceAreas.map((area, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                                        <span className="text-secondary-700">{area}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            The principles that guide our practice and client relationships
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                                <TrophyIcon className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-900 mb-3">Excellence</h3>
                            <p className="text-secondary-600">
                                Committed to delivering the highest quality legal services and achieving the best possible outcomes for our clients.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                                <ScaleIcon className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-900 mb-3">Integrity</h3>
                            <p className="text-secondary-600">
                                Upholding the highest ethical standards and maintaining transparency in all our professional dealings.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                                <UsersIcon className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-900 mb-3">Client Focus</h3>
                            <p className="text-secondary-600">
                                Putting our clients' needs first and providing personalized attention to every case and consultation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
