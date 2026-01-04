import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function ServiceCard({ icon: Icon, title, description, features = [], image_url, slug }) {
    // If we have an override image locally
    const localImage = [
        'notarial-services',
        'legal-consultation',
        'litigation',
        'corporate-law',
        'real-estate',
        'family-law',
        'labor-law',
        'special-projects'
    ].includes(slug) ? `/images/${slug.replace('-', '_')}_${slug === 'notarial-services' ? '1767510457772' :
        slug === 'legal-consultation' ? '1767510480514' :
            slug === 'litigation' ? '1767510503947' :
                slug === 'corporate-law' ? '1767510529163' :
                    slug === 'real-estate' ? '1767510559509' :
                        slug === 'family-law' ? '1767510586642' :
                            slug === 'labor-law' ? '1767510930550' :
                                '1767510954126'
    }.png` : image_url;

    const Wrapper = slug ? Link : 'div';
    const wrapperProps = slug ? { to: `/services/${slug}` } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className="block h-full"
        >
            <motion.div
                className="card hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                {/* Service Image */}
                {(localImage || image_url) && (
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                        <img
                            src={localImage || `/storage/${image_url}`}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                )}

                <div className="text-center flex-1 flex flex-col">
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4 mx-auto group-hover:bg-primary-600 transition-colors duration-300"
                        whileHover={{ rotate: 5 }}
                    >
                        <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-secondary-600 mb-4 flex-1">
                        {description}
                    </p>
                    {features.length > 0 && (
                        <ul className="space-y-2 text-left mt-4 pt-4 border-t border-secondary-100">
                            {features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center text-sm text-secondary-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CheckIcon className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                                    {feature}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </div>
            </motion.div>
        </Wrapper>
    );
}
