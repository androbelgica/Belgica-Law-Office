import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import InquiryWidget from '../Components/InquiryWidget';
import WhatsAppButton from '../Components/WhatsAppButton';
import FlashMessage from '../Components/FlashMessage';

export default function Layout({ children, title = 'BelgicaLaw' }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />

            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            {/* Floating Action Buttons */}
            <InquiryWidget />
            <WhatsAppButton />

            {/* Flash Messages */}
            <FlashMessage />
        </div>
    );
}
