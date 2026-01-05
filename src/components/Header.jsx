import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navigation = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Services', to: '/services' },
        { name: 'Articles', to: '/blog' },
        { name: 'Contact', to: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg py-2' : 'shadow-sm py-0'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'
                    }`}>
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="BelgicaLaw"
                                className={`w-auto transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'
                                    }`}
                            />
                            <span className="ml-2 text-3xl font-serif font-bold text-secondary-900">
                                BelgicaLaw
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="https://www.facebook.com/share/17nPeKiFyB/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1877F2] hover:text-[#0b5cbe] transition-colors p-1 rounded-full hover:bg-gray-100"
                            title="Visit us on Facebook"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <Link
                            to="/contact"
                            className="btn-primary"
                        >
                            Get Consultation
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-secondary-600 hover:text-secondary-900 p-2"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="text-secondary-600 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="btn-primary block text-center mt-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Consultation
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </motion.header>
    );
}
