import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import ArticleCard from '../components/ArticleCard';
import { motion } from 'framer-motion';

export default function Blog() {
    const articles = [
        {
            id: 1,
            title: 'Understanding Philippine Labor Laws',
            category: 'labor-law',
            slug: 'understanding-philippine-labor-laws',
            excerpt: 'A comprehensive guide to employee rights and employer responsibilities in the Philippines.',
            formatted_published_at: 'Oct 15, 2023',
            read_time: 5,
            views: 120,
            featured_image: null,
            is_featured: true,
            tags: ['Labor', 'Employment', 'Rights']
        },
        {
            id: 2,
            title: 'Buying Property in the Philippines',
            category: 'real-estate',
            slug: 'buying-property-philippines',
            excerpt: 'Essential legal steps and requirements for purchasing real estate in the country.',
            formatted_published_at: 'Nov 2, 2023',
            read_time: 7,
            views: 85,
            featured_image: null,
            is_featured: false,
            tags: ['Real Estate', 'Property', 'Investment']
        },
        {
            id: 3,
            title: 'Family Code Highlights',
            category: 'family-law',
            slug: 'family-code-highlights',
            excerpt: 'Key provisions of the Family Code that every Filipino family should know.',
            formatted_published_at: 'Dec 10, 2023',
            read_time: 4,
            views: 200,
            featured_image: null,
            is_featured: false,
            tags: ['Family', 'Marriage', 'Law']
        },
        // Add more articles to make it look "complete"
        {
            id: 4,
            title: 'Starting a Business: Legal Requirements',
            category: 'corporate-law',
            slug: 'starting-business-legal-requirements',
            excerpt: 'Everything you need to know about registering your business with the SEC and DTI.',
            formatted_published_at: 'Jan 5, 2024',
            read_time: 6,
            views: 45,
            featured_image: null,
            is_featured: false,
            tags: ['Business', 'Startup', 'SEC']
        },
        {
            id: 5,
            title: 'Estate Planning 101',
            category: 'family-law',
            slug: 'estate-planning-101',
            excerpt: 'Why having a Last Will and Testament is crucial for protecting your family\'s future.',
            formatted_published_at: 'Jan 20, 2024',
            read_time: 5,
            views: 67,
            featured_image: null,
            is_featured: false,
            tags: ['Wills', 'Estate', 'Inheritance']
        },
        {
            id: 6,
            title: 'Notary Public Services: What You Need',
            category: 'legal-tips',
            slug: 'notary-public-services-what-you-need',
            excerpt: 'Common documents that require notarization and what to bring to your appointment.',
            formatted_published_at: 'Feb 1, 2024',
            read_time: 3,
            views: 156,
            featured_image: null,
            is_featured: false,
            tags: ['Notary', 'Documents', 'Legal']
        }
    ];

    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(articles.map(article => article.category))];

    const filteredArticles = filter === 'All'
        ? articles
        : articles.filter(article => article.category === filter);

    return (
        <Layout title="Legal Blog - Insights and Updates">
            {/* Hero Section */}
            <div className="bg-secondary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-900 opacity-90"></div>
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
                    style={{ backgroundImage: "url('/images/bg.png')" }}
                ></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Legal Insights
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest legal news, guides, and practical advice from our expert team.
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                        <ArticleCard key={article.id} article={article} index={index} />
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No articles found in this category.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
