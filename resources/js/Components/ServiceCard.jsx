import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function ServiceCard({ icon: Icon, title, description, features, image_url }) {
    return (
        <motion.div
            className="card hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Service Image */}
            {image_url && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={`/storage/${image_url}`}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
            )}

            <div className="text-center p-6">
                <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4 group-hover:bg-primary-600 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                >
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-secondary-600 mb-4">
                    {description}
                </p>
                <ul className="space-y-2">
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
            </div>
        </motion.div>
    );
}
