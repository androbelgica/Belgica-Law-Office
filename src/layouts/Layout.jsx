import React, { useEffect } from 'react';
// import { Head } from '@inertiajs/react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryWidget from '../components/InquiryWidget';
import WhatsAppButton from '../components/WhatsAppButton';
import FlashMessage from '../components/FlashMessage';

export default function Layout({ children, title = 'BelgicaLaw' }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />

            {/* Floating Action Buttons */}
            <InquiryWidget />
            <WhatsAppButton />

            {/* Flash Messages - Temporarily disabled for serverless migration
            <FlashMessage />
            */}
        </div>
    );
}
