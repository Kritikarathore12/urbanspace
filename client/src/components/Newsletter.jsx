import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            setStatus('loading');
            await axios.post('http://localhost:5000/api/subscribe', { email });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-slate-900 border-t border-white/10 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-heading font-bold text-white mb-4">Subscribe to our Newsletter</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Stay up to date with the latest projects and tech trends. No spam, we promise.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="btn-primary whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                    </button>
                </form>
                {status === 'error' && <p className="text-red-500 text-sm mt-2">Something went wrong. Try again.</p>}
            </div>
        </div>
    );
};

export default Newsletter;
