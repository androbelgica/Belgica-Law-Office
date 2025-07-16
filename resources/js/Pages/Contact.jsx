import React from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import Map from '../Components/Map';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function Contact({ settings = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                // You can add a success notification here
            }
        });
    };

    const contactInfo = [
        {
            icon: MapPinIcon,
            title: 'Office Location',
            details: [settings.office_address || 'Metro Manila, Philippines' ]
        },
        {
            icon: PhoneIcon,
            title: 'Phone Number',
            details: [settings.contact_phone || '+63 XXX XXX XXXX', 'Available during office hours']
        },
        {
            icon: EnvelopeIcon,
            title: 'Email Address',
            details: [settings.contact_email || 'info@belgicalaw.com', 'We respond within 24 hours']
        },
        {
            icon: ClockIcon,
            title: 'Office Hours',
            details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 12:00 PM', 'Sun: Closed']
        }
    ];

    return (
        <Layout title="Contact Us - Get Legal Consultation">
            {/* Hero Section */}
            <section className="bg-secondary-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary-900 mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                            Ready to discuss your legal needs? Get in touch with us today for
                            professional legal consultation and services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-6">
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="legal-consultation">Legal Consultation</option>
                                            <option value="notarial-services">Notarial Services</option>
                                            <option value="corporate-legal">Corporate Legal</option>
                                            <option value="real-estate">Real Estate Law</option>
                                            <option value="family-law">Family Law</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                        placeholder="Please describe your legal needs or questions..."
                                        required
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                >
                                    {processing ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            Send Message
                                            <PaperAirplaneIcon className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-6">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                                                <info.icon className="h-6 w-6 text-primary-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail, detailIndex) => (
                                                <p key={detailIndex} className="text-secondary-600">
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 p-6 bg-secondary-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                                    Emergency Legal Assistance
                                </h3>
                                <p className="text-secondary-600 mb-4">
                                    For urgent legal matters that require immediate attention,
                                    please call our emergency line or send us a message through
                                    our inquiry widget.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={`tel:${settings.contact_phone || '+63XXXXXXXXXX'}`}
                                        className="btn-primary text-center"
                                    >
                                        Call Emergency Line
                                    </a>
                                    <a
                                        href="https://wa.me/63XXXXXXXXXX"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary text-center"
                                    >
                                        WhatsApp Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Location Map */}
            <section className="py-16 bg-secondary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                            Find Our Office
                        </h2>
                        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                            Visit us at our office for in-person consultations. We're conveniently located
                            and easily accessible by public transportation.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <Map
                            latitude={parseFloat(settings.office_latitude) || 14.5995}
                            longitude={parseFloat(settings.office_longitude) || 120.9842}
                            zoom={parseInt(settings.map_zoom_level) || 15}
                            address={settings.office_address || 'Metro Manila, Philippines'}
                            className="h-96 lg:h-[500px]"
                        />
                    </div>

                    {/* Directions and Transportation Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-secondary-900 mb-3 flex items-center">
                                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Getting Here
                            </h3>
                            <ul className="space-y-2 text-secondary-600">
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Accessible via MRT/LRT stations
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Multiple bus routes available
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Parking available for clients
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Wheelchair accessible building
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-secondary-900 mb-3 flex items-center">
                                <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Visit Information
                            </h3>
                            <ul className="space-y-2 text-secondary-600">
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Appointments recommended
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Walk-ins welcome during office hours
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Free initial consultation available
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    Bring relevant documents for consultation
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
