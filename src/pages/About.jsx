import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { supabase } from '../lib/supabase';
import {
    AcademicCapIcon,
    ScaleIcon,
    TrophyIcon,
    UsersIcon,
    CheckCircleIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function About() {
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const { data, error } = await supabase
                    .from('personnel')
                    .select('*')
                    .eq('is_active', true)
                    .order('sort_order', { ascending: true });

                if (error) throw error;
                setPersonnel(data || []);
            } catch (err) {
                console.error('Error fetching personnel:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonnel();
    }, []);

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
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-2">
                            Atty. Andrew A. Belgica
                        </h1>

                        <p className="text-lg text-secondary-700 italic mb-6">
                            Attorney-at-Law
                        </p>

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
                        {/* Profile Image */}
                        <div className="lg:col-span-1">
                            <div className="rounded-lg h-96 overflow-hidden shadow-lg">
                                <img
                                    src="/images/picture.png"
                                    alt="Atty. Andrew A. Belgica"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-6">
                                Professional Background
                            </h2>

                            <div className="prose prose-lg text-secondary-700 mb-8">
                                <p className="mb-4">
                                    Welcome to BelgicaLaw, where legal expertise meets personalized service. With years of experience in the Philippine legal system, we are committed to providing comprehensive legal solutions tailored to meet the unique needs of our clients.
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
                                    to="/contact"
                                    className="btn-primary"
                                >
                                    Schedule Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personnel/Staff Section */}
            {personnel.length > 0 && (
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                                Our Legal Team
                            </h2>
                            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                                Meet the dedicated professionals who work tirelessly to provide you with the best legal representation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {personnel.map((member) => (
                                <div key={member.id} className="bg-secondary-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary-100">
                                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                                        {member.image_url ? (
                                            <img 
                                                src={member.image_url} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                                                <UserGroupIcon className="h-20 w-20 text-primary-200" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary-600 font-semibold mb-4 tracking-wide uppercase text-xs">
                                        {member.role}
                                    </p>
                                    <p className="text-secondary-600 text-sm leading-relaxed line-clamp-4">
                                        {member.bio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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

