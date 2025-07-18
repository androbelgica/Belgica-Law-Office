import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import {
    ArrowRightIcon,
    CheckIcon,
    ScaleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    HomeIcon,
    HeartIcon,
    BriefcaseIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function ServiceSlider({ services = [] }) {
    const swiperRef = useRef(null);

    // Icon mapping for services from database
    const iconMap = {
        'ScaleIcon': ScaleIcon,
        'DocumentTextIcon': DocumentTextIcon,
        'UserGroupIcon': UserGroupIcon,
        'ShieldCheckIcon': ShieldCheckIcon,
        'HomeIcon': HomeIcon,
        'HeartIcon': HeartIcon,
        'BriefcaseIcon': BriefcaseIcon,
        'BuildingOfficeIcon': BuildingOfficeIcon,
    };

    // Map services to include proper icon components
    const servicesWithIcons = services.map(service => ({
        ...service,
        icon: iconMap[service.icon] || ScaleIcon
    }));

    if (!servicesWithIcons.length) {
        return null;
    }

    return (
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-600 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                        Our Legal Services
                    </h2>
                    <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                        Comprehensive legal solutions tailored to meet your specific needs with professional expertise and personalized attention.
                    </p>
                </motion.div>

                <div className="relative">
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet-custom',
                            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={servicesWithIcons.length > 1}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="service-slider"
                    >
                        {servicesWithIcons.map((service, index) => (
                            <SwiperSlide key={service.id || index}>
                                <ServiceSlide service={service} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 -ml-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 -mr-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* View All Services Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        View All Services
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </motion.div>
            </div>

            <style jsx>{`
                .service-slider .swiper-pagination {
                    bottom: -50px;
                }
                .swiper-pagination-bullet-custom {
                    width: 12px;
                    height: 12px;
                    background: #cbd5e1;
                    opacity: 1;
                    margin: 0 6px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active-custom {
                    background: #2563eb;
                    transform: scale(1.2);
                }
            `}</style>
        </section>
    );
}

function ServiceSlide({ service, index }) {
    const Icon = service.icon;

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
        >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden">
                {service.image_url ? (
                    <img
                        src={`/storage/${service.image_url}`}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-primary-600" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Service Content */}
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-600 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                        {service.title}
                    </h3>
                </div>

                <p className="text-secondary-600 mb-4 line-clamp-3">
                    {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm text-secondary-700">
                                <CheckIcon className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feature}</span>
                            </li>
                        ))}
                        {service.features.length > 3 && (
                            <li className="text-sm text-primary-600 font-medium">
                                +{service.features.length - 3} more features
                            </li>
                        )}
                    </ul>
                )}

                {/* Learn More Button */}
                <Link
                    href="/contact"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                >
                    Learn More
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}
