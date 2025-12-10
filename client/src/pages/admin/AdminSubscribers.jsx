import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Mail, Calendar } from 'lucide-react';

const AdminSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await api.get('/subscribe');
                setSubscribers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubscribers();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Newsletter Subscribers</h2>

            <div className="bg-slate-800 rounded-xl border border-white/10 overflow-hidden max-w-3xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">Email Address</th>
                            <th className="p-4 font-semibold">Subscribed Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {subscribers.map((sub) => (
                            <tr key={sub._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-accent/10 p-2 rounded-lg">
                                            <Mail className="h-4 w-4 text-accent" />
                                        </div>
                                        {sub.email}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && (
                            <tr>
                                <td colSpan="2" className="p-8 text-center text-gray-500">No subscribers yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSubscribers;
