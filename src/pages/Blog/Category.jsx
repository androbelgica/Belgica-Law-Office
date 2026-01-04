import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../../Layouts/Layout';
import ArticleCard from '../../Components/ArticleCard';
import {
    ArrowLeftIcon,
    BookOpenIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Category({ articles, category, categoryName, categories }) {
    const getCategoryIcon = (cat) => {
        const icons = {
            'legal-tips': '💡',
            'business-law': '🏢',
            'family-law': '👨‍👩‍👧‍👦',
            'real-estate': '🏠',
            'litigation': '⚖️',
            'news': '📰',
            'general': '📋'
        };
        return icons[cat] || '📄';
    };

    const getCategoryDescription = (cat) => {
        const descriptions = {
            'legal-tips': 'Practical legal advice and tips to help you navigate everyday legal situations.',
            'business-law': 'Corporate legal matters, business registration, compliance, and commercial law.',
            'family-law': 'Family-related legal issues including divorce, custody, adoption, and domestic relations.',
            'real-estate': 'Property law, real estate transactions, title issues, and property disputes.',
            'litigation': 'Court proceedings, legal disputes, and litigation support services.',
            'news': 'Latest updates and news in Philippine law and legal developments.',
            'general': 'General legal information and insights on various legal topics.'
        };
        return descriptions[cat] || 'Legal articles and insights on various topics.';
    };

    return (
        <Layout title={`${categoryName} Articles - BelgicaLaw`}>
            <Head>
                <meta name="description" content={`${getCategoryDescription(category)} Expert legal guidance from BelgicaLaw.`} />
                <meta name="keywords" content={`${categoryName}, Philippine law, legal advice, ${category.replace('-', ' ')}`} />
            </Head>

            {/* Category Header */}
            <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary-200 hover:text-white font-medium"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Back to All Articles
                        </Link>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="text-6xl mr-4">{getCategoryIcon(category)}</div>
                            <TagIcon className="h-8 w-8 text-primary-300" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            {categoryName}
                        </h1>

                        <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                            {getCategoryDescription(category)}
                        </p>

                        <div className="flex items-center justify-center text-primary-200">
                            <BookOpenIcon className="h-5 w-5 mr-2" />
                            <span>{articles.total} {articles.total === 1 ? 'article' : 'articles'} in this category</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Articles */}
                        <div className="lg:w-2/3">
                            {articles.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                        {articles.data.map((article, index) => (
                                            <ArticleCard
                                                key={article.id}
                                                article={article}
                                                index={index}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {articles.links && articles.links.length > 0 && (
                                        <div className="flex justify-center">
                                            <div className="flex space-x-1">
                                                {articles.links.map((link, index) => (
                                                    link.url ? (
                                                        <Link
                                                            key={index}
                                                            href={link.url}
                                                            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                                                                link.active
                                                                    ? 'bg-primary-600 text-white'
                                                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-400 border border-gray-300 opacity-50 cursor-not-allowed"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">{getCategoryIcon(category)}</div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                                        No articles in {categoryName} yet
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Check back soon for new articles in this category, or explore other topics.
                                    </p>
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                                    >
                                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                        Browse All Articles
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            {/* Other Categories */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Categories</h3>
                                <div className="space-y-3">
                                    {Object.entries(categories)
                                        .filter(([key]) => key !== category)
                                        .map(([key, name]) => (
                                            <Link
                                                key={key}
                                                href={`/blog/category/${key}`}
                                                className="flex items-center p-3 rounded-lg hover:bg-white transition-colors duration-200 group"
                                            >
                                                <div className="text-2xl mr-3">{getCategoryIcon(key)}</div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                                                        {name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Legal insights and advice
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="bg-primary-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                                    Need Legal Help?
                                </h3>
                                <p className="text-primary-700 text-sm mb-4">
                                    Our experienced legal team is ready to assist you with {categoryName.toLowerCase()} matters.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                                >
                                    Get Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                            Explore More Legal Topics
                        </h2>
                        <p className="text-gray-600">
                            Browse our comprehensive collection of legal articles and insights
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(categories).map(([key, name], index) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/blog/category/${key}`}
                                    className={`block p-4 rounded-lg text-center transition-all duration-200 ${
                                        key === category
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                                    }`}
                                >
                                    <div className="text-3xl mb-2">{getCategoryIcon(key)}</div>
                                    <h3 className="text-sm font-medium">{name}</h3>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
