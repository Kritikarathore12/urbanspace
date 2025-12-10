import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import ImageCropperModal from '../../components/ImageCropperModal';

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', designation: '', description: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSelectedImage(reader.result);
                setShowCropper(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedBlob) => {
        setCroppedImageBlob(croppedBlob);
        setShowCropper(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('designation', formData.designation);
        data.append('description', formData.description);
        if (croppedImageBlob) {
            data.append('image', croppedImageBlob, 'client-avatar.jpg');
        }

        try {
            await api.post('/clients', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsModalOpen(false);
            setFormData({ name: '', designation: '', description: '' });
            setSelectedImage(null);
            setCroppedImageBlob(null);
            fetchClients();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await api.delete(`/clients/${id}`);
                setClients(clients.filter(c => c._id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete client');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Clients</h2>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Client
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clients.map((client) => (
                    <div key={client._id} className="bg-slate-800 rounded-xl p-6 border border-white/10 flex flex-col items-center text-center relative group">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(client._id);
                            }}
                            className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300 z-10 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <img src={client.image} alt={client.name} className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-accent" />
                        <h3 className="text-white font-bold">{client.name}</h3>
                        <span className="text-accent text-xs mb-2">{client.designation}</span>
                        <p className="text-gray-400 text-xs line-clamp-3">"{client.description}"</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-white/20 p-6 rounded-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Add Client</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Designation</label>
                                    <input
                                        required
                                        value={formData.designation}
                                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Testimonial</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-accent"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Photo</label>
                                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-accent/50 cursor-pointer relative">
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    {croppedImageBlob ? (
                                        <div className="text-green-400 flex items-center justify-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4" /> Ready</div>
                                    ) : (
                                        <div className="text-gray-500 text-sm flex flex-col items-center"><ImageIcon className="h-6 w-6 mb-1" /> Upload</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <button type="submit" className="btn-primary">Save Client</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showCropper && (
                <ImageCropperModal
                    imageSrc={selectedImage}
                    aspect={1} // Square for Avatar
                    onCancel={() => { setShowCropper(false); setSelectedImage(null); }}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
};

export default AdminClients;
