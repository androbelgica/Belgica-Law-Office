import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import {
    ScaleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    HomeIcon,
    HeartIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ServiceDetail() {
    const { slug } = useParams();

    // Mock services database
    const services = [
        {
            slug: 'notarial-services',
            title: 'Notarial Services',
            description: 'Comprehensive notarial services for all legal documents.',
            icon: 'DocumentTextIcon',
            image: '/images/notarial_services_1767510457772.png',
            longDescription: `
                Our Notarial Services ensure the authenticity and legality of your important documents. 
                We provide efficient and reliable notarization for a wide range of documents including affidavits, contracts, deeds of sale, powers of attorney, and more.
                
                Proper notarization protects your rights and prevents fraud. Our office adheres to the strictest standards of the 2004 Rules on Notarial Practice.
            `,
            features: [
                'Affidavits and Sworn Statements',
                'Deeds of Sale and Donation',
                'Special and General Powers of Attorney',
                'Contracts and Agreements',
                'Authentication of Documents'
            ]
        },
        {
            slug: 'legal-consultation',
            title: 'Legal Consultation',
            description: 'Expert advice for individuals and businesses.',
            icon: 'UserGroupIcon',
            image: '/images/legal_consultation_1767510480514.png',
            longDescription: `
                Unsure about your legal standing? Our Legal Consultation services provide you with the clarity and direction you need.
                We offer in-depth analysis of your situation, explaining the applicable laws and maximizing your options.

                Whether it's a personal matter, a business dispute, or a potential lawsuit, getting the right advice early can save you time, money, and stress.
            `,
            features: [
                'Case Evaluation and Analysis',
                'Legal Opinions and Memos',
                'Rights and Remedies Assessment',
                'Pre-litigation Advice',
                'Contract Review'
            ]
        },
        {
            slug: 'litigation',
            title: 'Litigation',
            description: 'Representation in civil and criminal cases.',
            icon: 'ScaleIcon',
            image: '/images/litigation_1767510503947.png',
            longDescription: `
                When disputes escalate to the courtroom, you need a fierce and dedicated advocate. 
                Our Litigation practice covers representation in Civil, Criminal, and Administrative cases before various courts and tribunals in the Philippines.

                We handle every stage of the process, from filing pleadings to trial and appeals, fighting tirelessly to protect your interests.
            `,
            features: [
                'Civil and Criminal Cases',
                'Family Court Cases',
                'Appeals to Higher Courts',
                'Administrative Proceedings',
                'Dispute Resolution'
            ]
        },
        {
            slug: 'corporate-law',
            title: 'Corporate Law',
            description: 'Business registration, detailed compliance, and contracts.',
            icon: 'BuildingOfficeIcon',
            image: '/images/corporate_law_1767510529163.png',
            longDescription: `
                Navigate the complex business landscape with confidence. Our Corporate Law services support businesses of all sizes, from startups to established corporations.
                
                We assist with SEC registration, compliance requirements, corporate housekeeping, and drafting of commercial contracts to ensure your business operates within the bounds of the law.
            `,
            features: [
                'Business Registration (SEC/DTI)',
                'Corporate Housekeeping & Compliance',
                'Contract Drafting and Review',
                'Mergers and Acquisitions',
                'Labor Relations Advice'
            ]
        },
        {
            slug: 'real-estate',
            title: 'Real Estate',
            description: 'Property transactions and land disputes.',
            icon: 'HomeIcon',
            image: '/images/real_estate_1767510559509.png',
            longDescription: `
                Secure your property investments with our expert Real Estate legal services. 
                We handle land titling, transfer of ownership, lease agreements, and resolution of property disputes.

                Whether you are buying your first home or managing a portfolio of properties, we ensure that your transactions are smooth and legally sound.
            `,
            features: [
                'Land Title Transfer and Registration',
                'Deed of Sale and Absolute Sale',
                'Lease and Rental Agreements',
                'Property Dispute Resolution',
                'Due Diligence on Property Titles'
            ]
        },
        {
            slug: 'family-law',
            title: 'Family Law',
            description: 'Marriage, annulment, and support cases.',
            icon: 'HeartIcon',
            image: '/images/family_law_1767510586642.png',
            longDescription: `
                Family legal matters require sensitivity and strength. We provide compassionate guidance and robust representation in cases involving family relations.

                Our expertise covers nullity of marriage, legal separation, child custody, support, and adoption. We aim to achieve resolutions that respect the dignity of all parties involved, especially children.
            `,
            features: [
                'Declaration of Nullity of Marriage',
                'Child Custody and Support',
                'Adoption Proceedings',
                'Violence Against Women and Children (VAWC)',
                'Estate Planning and Wills'
            ]
        }
    ];

    const service = services.find(s => s.slug === slug);

    // Icon mapping
    const iconMap = {
        'ScaleIcon': ScaleIcon,
        'DocumentTextIcon': DocumentTextIcon,
        'UserGroupIcon': UserGroupIcon,
        'ShieldCheckIcon': ShieldCheckIcon,
        'HomeIcon': HomeIcon,
        'HeartIcon': HeartIcon,
        'BriefcaseIcon': BriefcaseIcon,
        'BuildingOfficeIcon': BuildingOfficeIcon,
    };

    if (!service) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
                        <Link to="/services" className="text-primary-600 hover:underline mt-4 block">
                            Back to Services
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const Icon = iconMap[service.icon] || ScaleIcon;

    return (
        <Layout title={`${service.title} - BelgicaLaw`}>
            {/* Hero Section */}
            <div className="relative h-96">
                <div className="absolute inset-0">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                    <Link to="/services" className="text-white/80 hover:text-white flex items-center mb-6 group w-fit">
                        <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary-600 rounded-lg mr-4">
                            <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            {service.title}
                        </h1>
                    </div>
                    <p className="text-xl text-gray-200 max-w-2xl ml-16">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-6">
                                Overview
                            </h2>
                            <div className="prose prose-lg text-secondary-600 mb-8 whitespace-pre-line">
                                {service.longDescription}
                            </div>

                            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                                What We Offer
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-start p-4 bg-secondary-50 rounded-lg">
                                        <CheckCircleIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                                        <span className="font-medium text-secondary-900">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-secondary-50 p-8 rounded-xl sticky top-24">
                                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                                    Need Legal Assistance?
                                </h3>
                                <p className="text-secondary-600 mb-6">
                                    Contact us today to schedule a consultation regarding your {service.title.toLowerCase()} needs.
                                </p>
                                <Link
                                    to="/contact"
                                    className="block w-full text-center btn-primary mb-4"
                                >
                                    Book an Appointment
                                </Link>
                                <a
                                    href="tel:+63XXXXXXXXXX"
                                    className="block w-full text-center border-2 border-primary-600 text-primary-600 font-semibold py-2 rounded-lg hover:bg-primary-50 transition-colors"
                                >
                                    Call Us Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
