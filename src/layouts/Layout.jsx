import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryWidget from '../components/InquiryWidget';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Layout({ children, title }) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | BelgicaLaw`;
        }
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <InquiryWidget />
            <WhatsAppButton />
        </div>
    );
}
