import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../../Layouts/Layout';
import { CompactBlogSection } from '../../Components/BlogSection';
import { 
    CalendarIcon,
    ClockIcon,
    EyeIcon,
    TagIcon,
    ArrowLeftIcon,
    ShareIcon
} from '@heroicons/react/24/outline';

export default function Show({ article, relatedArticles }) {
    const shareUrl = window.location.href;
    const shareTitle = article.title;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                url: shareUrl,
            });
        } else {
            // Fallback to copying URL to clipboard
            navigator.clipboard.writeText(shareUrl);
            alert('Article URL copied to clipboard!');
        }
    };

    return (
        <Layout title={`${article.title} - BelgicaLaw`}>
            <Head>
                <meta name="description" content={article.meta_description || article.excerpt} />
                <meta name="keywords" content={article.tags ? article.tags.join(', ') : ''} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.meta_title || article.title} />
                <meta property="og:description" content={article.meta_description || article.excerpt} />
                <meta property="og:url" content={shareUrl} />
                {article.featured_image && (
                    <meta property="og:image" content={`${window.location.origin}/storage/${article.featured_image}`} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.meta_title || article.title} />
                <meta name="twitter:description" content={article.meta_description || article.excerpt} />
                {article.featured_image && (
                    <meta name="twitter:image" content={`${window.location.origin}/storage/${article.featured_image}`} />
                )}
            </Head>

            {/* Article Header */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Back to Articles
                        </Link>
                    </motion.div>

                    {/* Article Meta */}
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            {article.is_featured && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Featured
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {article.formatted_published_at}
                            </div>
                            <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {article.read_time} min read
                            </div>
                            <div className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1" />
                                {article.views} views
                            </div>
                        </div>
                    </motion.div>

                    {/* Article Title */}
                    <motion.h1 
                        className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {article.title}
                    </motion.h1>

                    {/* Article Excerpt */}
                    {article.excerpt && (
                        <motion.p 
                            className="text-xl text-gray-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {article.excerpt}
                        </motion.p>
                    )}

                    {/* Featured Image */}
                    {article.featured_image && (
                        <motion.div 
                            className="mb-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <img
                                src={`/storage/${article.featured_image}`}
                                alt={article.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </motion.div>
                    )}

                    {/* Share Button */}
                    <motion.div 
                        className="flex justify-end mb-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            <ShareIcon className="h-4 w-4 mr-2" />
                            Share Article
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="prose prose-lg max-w-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div 
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="text-gray-700 leading-relaxed"
                        />
                    </motion.div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <motion.div 
                            className="mt-12 pt-8 border-t border-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                                    >
                                        <TagIcon className="h-3 w-3 mr-1" />
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Article Footer */}
                    <motion.div 
                        className="mt-12 pt-8 border-t border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="bg-primary-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-primary-900 mb-2">
                                Need Legal Assistance?
                            </h3>
                            <p className="text-primary-700 mb-4">
                                If you have questions about this topic or need professional legal advice, 
                                our experienced team is here to help.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                            >
                                Get Legal Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <CompactBlogSection 
                    articles={relatedArticles} 
                    title="Related Articles" 
                />
            )}
        </Layout>
    );
}
