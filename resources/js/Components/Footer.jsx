import React from 'react';
import { Link } from '@inertiajs/react';
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
                            <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                                About
                            </Link>
                            <Link href="/services" className="text-secondary-300 hover:text-white transition-colors">
                                Services
                            </Link>
                            <Link href="/contact" className="text-secondary-300 hover:text-white transition-colors">
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
                                    Metro Manila, Philippines
                                </span>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                                <span className="text-secondary-300 text-sm">
                                    +63 XXX XXX XXXX
                                </span>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                                <span className="text-secondary-300 text-sm">
                                    info@belgicalaw.com
                                </span>
                            </div>
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
                            <Link href="/privacy" className="text-secondary-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-secondary-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
