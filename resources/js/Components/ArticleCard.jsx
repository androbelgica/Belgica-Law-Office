import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    CalendarIcon, 
    ClockIcon, 
    EyeIcon,
    TagIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ArticleCard({ article, index = 0, featured = false }) {
    const cardClass = featured 
        ? "bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full"
        : "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full";

    return (
        <motion.article
            className={cardClass}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            {/* Featured Image */}
            <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
                {article.featured_image ? (
                    <img
                        src={`/storage/${article.featured_image}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <TagIcon className="h-16 w-16 text-primary-600" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                        {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </div>

                {/* Featured Badge */}
                {article.is_featured && (
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center text-sm text-secondary-500 mb-3 space-x-4">
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
                        {article.views}
                    </div>
                </div>

                {/* Title */}
                <h3 className={`font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 ${featured ? 'text-xl' : 'text-lg'}`}>
                    <Link href={`/blog/${article.slug}`} className="hover:underline">
                        {article.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-secondary-600 mb-4 line-clamp-3">
                    {article.excerpt}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary-100 text-secondary-700"
                            >
                                #{tag}
                            </span>
                        ))}
                        {article.tags.length > 3 && (
                            <span className="text-xs text-secondary-500">
                                +{article.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Read More Link */}
                <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                >
                    Read More
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </motion.article>
    );
}

// Featured Article Card for hero sections
export function FeaturedArticleCard({ article }) {
    return (
        <motion.article
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                {article.featured_image ? (
                    <img
                        src={`/storage/${article.featured_image}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 text-white">
                {/* Category */}
                <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
                        {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-200 transition-colors duration-300">
                    <Link href={`/blog/${article.slug}`} className="hover:underline">
                        {article.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-200 mb-4 line-clamp-2">
                    {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-300 space-x-4">
                        <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {article.formatted_published_at}
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {article.read_time} min
                        </div>
                    </div>

                    <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-300"
                    >
                        Read Article
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
