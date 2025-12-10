import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 bg-cover bg-center"
            // Using the extracted landing page image (Image28.png)
            // If image is missing, it falls back to a dark gradient
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
                />
                {/* Gradient Overlay for Premium Look */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card p-8 md:p-12 max-w-4xl mx-auto border-white/10"
                >
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Consultation, <span className="text-accent">Design</span> & Marketing
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Elevating your brand with premium web solutions and strategic digital marketing.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <a href="#projects" className="btn-primary flex items-center justify-center gap-2">
                            View Projects
                        </a>
                        <a href="#contact" className="btn-ghost flex items-center justify-center gap-2">
                            Get A Quote
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mb-1" />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
