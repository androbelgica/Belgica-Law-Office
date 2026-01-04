import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ServiceCard({ title, description, icon: Icon, slug }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                    {Icon && <Icon className="h-6 w-6 text-primary-600" />}
                </div>
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2 font-serif">{title}</h3>
            <p className="text-secondary-600 mb-6 flex-grow">{description}</p>
            <Link
                to={slug ? `/services/${slug}` : '/services'}
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
                Learn More
                <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
        </div>
    );
}
