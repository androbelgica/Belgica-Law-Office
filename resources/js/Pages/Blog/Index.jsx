import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../../Layouts/Layout';
import ArticleCard, { FeaturedArticleCard } from '../../Components/ArticleCard';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    BookOpenIcon,
    SparklesIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Index({ articles, featuredArticles, recentArticles, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'all');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/blog', { search, category }, { preserveState: true });
    };

    const handleCategoryFilter = (selectedCategory) => {
        setCategory(selectedCategory);
        router.get('/blog', { search, category: selectedCategory }, { preserveState: true });
    };

    return (
        <Layout title="Legal Articles & Insights - BelgicaLaw">
            <Head>
                <meta name="description" content="Stay informed with our latest legal insights, tips, and updates on Philippine law. Expert guidance from BelgicaLaw to help you navigate complex legal matters." />
                <meta name="keywords" content="legal articles, Philippine law, legal tips, business law, family law, real estate law, legal insights" />
            </Head>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <BookOpenIcon className="h-12 w-12 text-primary-200 mr-3" />
                            <SparklesIcon className="h-8 w-8 text-primary-300" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Legal Insights & Articles
                        </h1>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                            Stay informed with expert legal guidance, practical tips, and the latest updates
                            on Philippine law from our experienced legal team.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search articles..."
                                    className="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                                />
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
                <section className="py-16 bg-secondary-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
                                Featured Articles
                            </h2>
                            <div className="w-16 h-1 bg-primary-600 mx-auto"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredArticles.map((article, index) => (
                                <FeaturedArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Articles */}
                        <div className="lg:w-2/3">
                            {/* Category Filter */}
                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCategoryFilter('all')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                            category === 'all'
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        All Articles
                                    </button>
                                    {Object.entries(categories).map(([key, name]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleCategoryFilter(key)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                                category === key
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Articles Grid */}
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
                                    <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {search || category !== 'all'
                                            ? 'Try adjusting your search or filter criteria.'
                                            : 'Check back soon for new legal insights and articles.'
                                        }
                                    </p>
                                    {(search || category !== 'all') && (
                                        <Link
                                            href="/blog"
                                            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                                        >
                                            View All Articles
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            {/* Recent Articles */}
                            {recentArticles.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Articles</h3>
                                    <div className="space-y-4">
                                        {recentArticles.map((article) => (
                                            <Link
                                                key={article.id}
                                                href={`/blog/${article.slug}`}
                                                className="block group"
                                            >
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                                                    {article.title}
                                                </h4>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <span>{article.formatted_published_at}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{article.read_time} min read</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Categories */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {Object.entries(categories).map(([key, name]) => (
                                        <Link
                                            key={key}
                                            href={`/blog/category/${key}`}
                                            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                                        >
                                            <TagIcon className="h-4 w-4 mr-2" />
                                            {name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
