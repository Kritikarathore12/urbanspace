import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            className="group relative overflow-hidden glass-card border-white/10"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-3 mb-6 font-light">{project.description}</p>

                {/* Interactive Ghost Button */}
                <a
                    href="#contact"
                    className="btn-ghost text-xs px-4 py-2 w-full flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-primary font-bold transition-all"
                >
                    Request Case Study
                </a>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
