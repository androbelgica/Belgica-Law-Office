import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function TestimonialCarousel({ testimonials }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial Display */}
            <div className="relative h-64 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-center px-8">
                            {/* Stars */}
                            <div className="flex justify-center mb-4">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            
                            {/* Quote */}
                            <blockquote className="text-lg md:text-xl text-secondary-700 mb-6 italic">
                                "{testimonials[currentIndex].content}"
                            </blockquote>
                            
                            {/* Author */}
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-primary-600 font-semibold text-lg">
                                        {testimonials[currentIndex].name.charAt(0)}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-secondary-900">
                                        {testimonials[currentIndex].name}
                                    </p>
                                    <p className="text-sm text-secondary-500">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            
            <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                            index === currentIndex 
                                ? 'bg-primary-600' 
                                : 'bg-secondary-300 hover:bg-secondary-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
