import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/#projects' },
        { name: 'Clients', path: '/#clients' },
        { name: 'Contact', path: '/#contact' },
        { name: 'Admin', path: '/admin' },
    ];

    return (
        <nav className={clsx(
            "fixed top-0 w-full z-50 transition-all duration-300",
            scrolled ? "bg-primary/80 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent py-4"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/assets/logo.png" alt="UrbanSpace" className="h-10 w-auto object-contain" />
                        <span className="text-2xl font-heading font-bold text-white tracking-wide">
                            Urban<span className="text-accent">Space</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide hover:underline decoration-accent underline-offset-4"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="#contact"
                            className="btn-primary text-sm px-6 py-2"
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
