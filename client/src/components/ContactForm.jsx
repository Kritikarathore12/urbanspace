import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        city: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API delay for UX
        // await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('success');
            setFormData({ fullName: '', email: '', mobile: '', city: '' });
            setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="glass-card p-8 md:p-10 w-full max-w-lg mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">Get In Touch</h3>

            {status === 'success' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10"
                >
                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                    <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                    <p className="text-gray-400 text-center mt-2">We'll get back to you shortly.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {['fullName', 'email', 'mobile', 'city'].map((field) => (
                        <div key={field} className="relative">
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                id={field}
                                required
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <label
                                htmlFor={field}
                                className="absolute left-4 top-4 text-gray-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent capitalize"
                            >
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
                    >
                        {status === 'loading' ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Submit Request</span>
                                <Send className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
