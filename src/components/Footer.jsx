import React from 'react';
import { Link } from 'react-router-dom';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function Footer() {
    return (
        <footer className="bg-secondary-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <img
                                src="/images/logo.png"
                                alt="BelgicaLaw"
                                className="h-8 w-auto filter brightness-0 invert"
                            />
                            <span className="ml-2 text-xl font-serif font-bold">
                                BelgicaLaw
                            </span>
                        </div>
                        <p className="text-secondary-300 mb-4 max-w-md">
                            Professional legal consultation and notarial services in Metro Manila.
                            Committed to providing reliable and trustworthy legal assistance.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                                About
                            </Link>
                            <Link to="/services" className="text-secondary-300 hover:text-white transition-colors">
                                Services
                            </Link>
                            <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPinIcon className="h-5 w-5 text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-secondary-300 text-sm">
                                    17-A Sta Lucia St. cor SAV-1 Ave. Brgy. San Antonio, Paranaque City, Metro Manila
                                </span>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                                <span className="text-secondary-300 text-sm">
                                    +63 918 576 3952 / 7757-1141
                                </span>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                                <span className="text-secondary-300 text-sm">
                                    belgicalaw22@gmail.com
                                </span>
                            </div>
                            <a
                                href="https://www.facebook.com/share/17nPeKiFyB/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center group"
                            >
                                <svg className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0 group-hover:text-primary-300 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                                <span className="text-secondary-300 text-sm group-hover:text-white transition-colors">
                                    Visit us on Facebook
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                                <div className="text-secondary-300 text-sm">
                                    <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                                    <div>Sat: 9:00 AM - 12:00 PM</div>
                                    <div>Sun: Closed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-secondary-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-secondary-400 text-sm">
                            © {new Date().getFullYear()} BelgicaLaw. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
