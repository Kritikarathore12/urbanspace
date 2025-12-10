import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const ClientCard = ({ client }) => {
    return (
        <motion.div
            className="glass-card p-8 flex flex-col items-center text-center relative max-w-sm mx-auto h-full"
            whileHover={{ scale: 1.02 }}
        >
            <Quote className="absolute top-4 left-4 h-8 w-8 text-accent/20" />

            {/* Avatar */}
            <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-accent to-purple-600 shadow-xl shadow-accent/20">
                    <img
                        src={client.image}
                        alt={client.name}
                        className="w-full h-full rounded-full object-cover border-4 border-primary"
                    />
                </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-accent transition-colors">{client.name}</h3>
            <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-4 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                {client.designation}
            </p>
            <p className="text-gray-400 text-sm italic relative z-10">
                "{client.description}"
            </p>
        </motion.div>
    );
};

export default ClientCard;
