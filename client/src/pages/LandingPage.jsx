import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ClientCard from '../components/ClientCard';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const LandingPage = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fallback Dummy Data for "Wow" Factor if DB is empty
    const dummyProjects = [
        { _id: '1', title: 'E-Commerce Redesign', description: 'A complete overhaul of a fashion retailer website using Next.js and Shopify.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
        { _id: '2', title: 'Fintech Dashboard', description: 'Real-time analytics dashboard for a banking client with complex data visualization.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
        { _id: '3', title: 'AI Health App', description: 'Mobile-first application leveraging AI for personalized health recommendations.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
    ];

    const dummyClients = [
        { _id: '1', name: 'Sarah Johnson', designation: 'CEO, TechFlow', description: 'Exceptional work! The team delivered beyond our expectations.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
        { _id: '2', name: 'Michael Chen', designation: 'CTO, StartUp Inc', description: 'Professional, creative, and timely. Highly recommended.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
        { _id: '3', name: 'Emily Davis', designation: 'Director, ArtSpace', description: 'The new design completely revitalized our brand.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, clientRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/projects'),
                    axios.get('http://localhost:5000/api/clients')
                ]);

                setProjects(projRes.data);
                setClients(clientRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-primary min-h-screen">
            <Navbar />

            <Hero />

            {/* Our Projects Section */}
            <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Our Projects</h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </section>

            {/* Happy Clients Section */}
            <section id="clients" className="py-24 bg-slate-900/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Happy Clients</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                    </div>

                    {/* Simple Grid for now - can be made into marquee */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clients.map((client) => (
                            <ClientCard key={client._id} client={client} />
                        ))}
                    </div>
                </div>

                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Contact Info Text */}
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                            Let's Start a <br />
                            <span className="text-accent">Conversation</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Ready to take your digital presence to the next level? Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-4">
                            <div className="glass-panel p-6 rounded-xl">
                                <h4 className="text-white font-bold mb-1">Email Us</h4>
                                <p className="text-gray-400">hello@portfoliox.dev</p>
                            </div>
                            <div className="glass-panel p-6 rounded-xl">
                                <h4 className="text-white font-bold mb-1">Call Us</h4>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <ContactForm />
                </div>
            </section>

            <Newsletter />

            <Footer />
        </div>
    );
};

export default LandingPage;
