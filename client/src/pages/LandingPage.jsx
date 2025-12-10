import React, { useState, useEffect } from 'react';
import api from '../utils/api'; // Import centralized api

// ...

try {
    const [projRes, clientRes] = await Promise.all([
        api.get('/projects'), // Use relative path
        api.get('/clients')
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
