import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BlogPost() {
    const { slug } = useParams();

    // Mock articles database (same as in Blog.jsx + content)
    const articles = [
        {
            id: 1,
            title: 'Understanding Philippine Labor Laws',
            category: 'labor-law',
            slug: 'understanding-philippine-labor-laws',
            formatted_published_at: 'Oct 15, 2023',
            read_time: 5,
            author: 'Atty. Belgica',
            content: `
                <p class="mb-4">
                    Labor laws in the Philippines are designed to afford protection to labor, promote full employment, ensure equal work opportunities regardless of sex, race or creed, and regulate the relations between workers and employers.
                </p>
                <h3 class="text-xl font-bold mb-2">Key Rights of Employees</h3>
                <ul class="list-disc pl-5 mb-4">
                    <li>Security of Tenure</li>
                    <li>Minimum Wage</li>
                    <li>Holiday Pay, 13th Month Pay, and Overtime Pay</li>
                    <li>Rest Days and Leaves (Service Incentive Leave, Maternity/Paternity Leave)</li>
                    <li>Social Security Benefits (SSS, PhilHealth, Pag-IBIG)</li>
                </ul>
                <p class="mb-4">
                    Employers must also maintain a safe working environment and observe due process when imposing disciplinary actions or termination.
                </p>
                <div class="bg-gray-50 p-4 border-l-4 border-primary-600 my-6">
                    <strong>Note:</strong> This article provides a general overview. Specific cases may vary.
                </div>
            `,
            featured_image: null
        },
        // ... (We would ideally fetch this data based on slug)
        {
            id: 2,
            title: 'Buying Property in the Philippines',
            slug: 'buying-property-philippines',
            category: 'real-estate',
            formatted_published_at: 'Nov 2, 2023',
            read_time: 7,
            author: 'Atty. Belgica',
            content: `
                <p class="mb-4">Buying real estate is one of the most significant investments you can make. Here is a simplified guide to the legal process in the Philippines.</p>
                <h3 class="text-xl font-bold mb-2">1. Due Diligence</h3>
                <p class="mb-4">Before signing anything, verify the Transfer Certificate of Title (TCT) with the Register of Deeds. Ensure the seller is the real owner and there are no encumbrances.</p>
                <h3 class="text-xl font-bold mb-2">2. Deed of Absolute Sale</h3>
                <p class="mb-4">Once the price is agreed upon and payment is made, a Deed of Absolute Sale is drafted and notarized.</p>
                <h3 class="text-xl font-bold mb-2">3. Taxes and Transfer</h3>
                <p class="mb-4">You must pay the Capital Gains Tax, Documentary Stamp Tax, Transfer Tax, and Registration Fees before the new title can be issued in your name.</p>
            `,
            featured_image: null
        }
    ];

    const article = articles.find(a => a.slug === slug) || articles[0]; // Fallback to first if not found for demo

    return (
        <Layout title={`${article.title} - BelgicaLaw Blog`}>
            <div className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 transition-colors">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Articles
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        {article.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 space-x-6 border-b border-gray-100 pb-8">
                        <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2" />
                            {article.author}
                        </div>
                        <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {article.formatted_published_at}
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {article.read_time} min read
                        </div>
                        <div className="flex items-center">
                            <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full font-medium">
                                {article.category}
                            </span>
                        </div>
                    </div>

                    {/* Featured Image Placeholder */}
                    <div className="w-full h-80 bg-gray-200 rounded-xl mb-8 flex items-center justify-center text-gray-400">
                        {article.featured_image ? (
                            <img src={article.featured_image} className="w-full h-full object-cover rounded-xl" alt={article.title} />
                        ) : (
                            <span className="text-lg">Featured Image</span>
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 font-sans"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </div>
        </Layout>
    );
}
