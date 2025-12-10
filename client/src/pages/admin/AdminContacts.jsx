import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get('/contact');
                setContacts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Inquiries</h2>

            <div className="bg-slate-800 rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Contact Info</th>
                                <th className="p-4 font-semibold">City</th>
                                <th className="p-4 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {contacts.map((contact) => (
                                <tr key={contact._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-white">{contact.fullName}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-accent" /> {contact.email}</div>
                                            <div className="flex items-center gap-2"><Phone className="h-3 w-3 text-accent" /> {contact.mobile}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-gray-500" /> {contact.city}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {contacts.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">No inquiries yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminContacts;
