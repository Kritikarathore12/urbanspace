import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Use centralized api

// ...

const onSubmit = async e => {
    e.preventDefault();
    try {
        const res = await api.post('/auth/login', formData); // Relative path
        localStorage.setItem('token', res.data.token);
        navigate('/admin');
    } catch (err) {
        setError(err.response?.data?.msg || 'Login Failed');
    }
};

return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/assets/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/95" />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 rounded-2xl w-full max-w-md relative z-10 border border-white/10 shadow-2xl"
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Admin Access</h2>
                <p className="text-gray-400">Restricted Area. Authorized Personnel Only.</p>
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg inline-block">
                    <p className="text-xs text-blue-300">Demo Credentials:</p>
                    <p className="text-xs text-blue-200 mt-1">User: <span className="font-mono font-bold">admin</span> | Pass: <span className="font-mono font-bold">admin123</span></p>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full btn-primary py-3 rounded-lg font-bold text-primary bg-accent hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
                >
                    Login to Dashboard
                </button>
            </form>
        </motion.div>
    </div>
);
};

export default LoginPage;
