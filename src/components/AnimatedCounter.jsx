import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

export default function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '', title, description }) {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
        >
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {inView && (
                    <>
                        {prefix}
                        <CountUp
                            start={0}
                            end={end}
                            duration={duration}
                            separator=","
                        />
                        {suffix}
                    </>
                )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-primary-100">{description}</p>
        </motion.div>
    );
}
