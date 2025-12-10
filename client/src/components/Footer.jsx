import React from 'react';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-primary border-t border-white/10 pt-16 pb-8 overflow-hidden">
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-heading font-bold text-white">
                            Urban<span className="text-accent">Space</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting digital experiences that merge premium aesthetics with powerful functionality.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Projects', 'Clients', 'Admin Panel'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Admin Panel' ? '/admin' : '/'} className="text-gray-400 hover:text-accent transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="h-5 w-5 text-accent shrink-0" />
                                <span>123 Innovation Dr, Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="h-5 w-5 text-accent shrink-0" />
                                <span>hello@urbanspace.dev</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="h-5 w-5 text-accent shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter (Static for now, will connect later) */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Stay updated with our latest projects.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                            />
                            <button className="btn-primary py-2 text-sm w-full">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2024 UrbanSpace. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
