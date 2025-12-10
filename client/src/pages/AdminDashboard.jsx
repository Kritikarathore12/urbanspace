import React, { useState } from 'react';
import { LayoutDashboard, Users, Briefcase, Mail, Bell, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
// Import Modules (Placeholder imports until created)
// import AdminProjects from './admin/AdminProjects';
// import AdminClients from './admin/AdminClients';
// import AdminContacts from './admin/AdminContacts';
// import AdminSubscribers from './admin/AdminSubscribers';
// I will create simple inline components if files are not ready, 
// to prevent build errors during development.

// Temporary Placeholders
const Placeholder = ({ title }) => <div className="p-8 text-white text-xl">{title} Module Loading...</div>;

import AdminProjects from './admin/AdminProjects';
import AdminClients from './admin/AdminClients';
import AdminContacts from './admin/AdminContacts';
import AdminSubscribers from './admin/AdminSubscribers';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const menuItems = [
        // { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'clients', label: 'Clients', icon: Users },
        { id: 'contacts', label: 'Inquiries', icon: Mail },
        { id: 'subscribers', label: 'Subscribers', icon: Bell },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white overflow-hidden">

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed md:relative z-20 h-full bg-slate-800 border-r border-white/10 transition-all duration-300 w-64",
                    !isSidebarOpen && "-ml-64 md:ml-0 md:w-20"
                )}
            >
                <div className="h-16 flex items-center justify-center border-b border-white/10">
                    <span className={clsx("font-heading font-bold text-xl", !isSidebarOpen && "md:hidden")}>
                        Admin<span className="text-accent">Panel</span>
                    </span>
                    {!isSidebarOpen && <span className="hidden md:block font-bold text-accent">A</span>}
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                activeTab === item.id
                                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span className={clsx(!isSidebarOpen && "md:hidden")}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-0 w-full p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span className={clsx(!isSidebarOpen && "md:hidden")}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Topbar */}
                <header className="h-16 bg-slate-800/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white p-2">
                        {isSidebarOpen ? <Menu className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Welcome, Admin</span>
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">A</div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900">
                    {activeTab === 'projects' && <AdminProjects />}
                    {activeTab === 'clients' && <AdminClients />}
                    {activeTab === 'contacts' && <AdminContacts />}
                    {activeTab === 'subscribers' && <AdminSubscribers />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
