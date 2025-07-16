import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';
import { 
    ArrowRightIcon,
    BookOpenIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function BlogSection({ articles = [] }) {
    if (!articles.length) {
        return null;
    }

    return (
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-primary-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-600 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center space-x-2">
                            <BookOpenIcon className="h-8 w-8 text-primary-600" />
                            <SparklesIcon className="h-6 w-6 text-primary-400" />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                        Legal Insights & Articles
                    </h2>
                    <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                        Stay informed with our latest legal insights, tips, and updates on Philippine law. 
                        Expert guidance to help you navigate complex legal matters.
                    </p>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.slice(0, 3).map((article, index) => (
                        <ArticleCard 
                            key={article.id} 
                            article={article} 
                            index={index}
                        />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        View All Articles
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </motion.div>

                {/* Featured Categories */}
                <motion.div 
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {[
                        { name: 'Legal Tips', slug: 'legal-tips', icon: '💡' },
                        { name: 'Business Law', slug: 'business-law', icon: '🏢' },
                        { name: 'Family Law', slug: 'family-law', icon: '👨‍👩‍👧‍👦' },
                        { name: 'Real Estate', slug: 'real-estate', icon: '🏠' }
                    ].map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/blog/category/${category.slug}`}
                            className="group p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
                        >
                            <div className="text-2xl mb-2">{category.icon}</div>
                            <h3 className="text-sm font-medium text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Compact version for other pages
export function CompactBlogSection({ articles = [], title = "Related Articles" }) {
    if (!articles.length) {
        return null;
    }

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-2">
                        {title}
                    </h2>
                    <div className="w-16 h-1 bg-primary-600 mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                        <ArticleCard 
                            key={article.id} 
                            article={article} 
                            index={index}
                        />
                    ))}
                </div>

                {articles.length >= 3 && (
                    <div className="text-center mt-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                            View More Articles
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
