import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import ImageCropperModal from '../../components/ImageCropperModal';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    // Fetch Projects
    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
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
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (croppedImageBlob) {
            data.append('image', croppedImageBlob, 'project-image.jpg');
        }

        try {
            await api.post('/projects', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsModalOpen(false);
            setFormData({ title: '', description: '' });
            setSelectedImage(null);
            setCroppedImageBlob(null);
            fetchProjects();
        } catch (err) {
            console.error(err);
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete project');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Projects</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add Project
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-slate-800 rounded-xl overflow-hidden border border-white/10 group">
                        <div className="aspect-video relative">
                            <img
                                src={project.image.startsWith('http') ? project.image : `http://localhost:5000/${project.image}`}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(project._id);
                                    }}
                                    className="text-red-400 hover:text-red-300 p-2 bg-white/10 rounded-full transition-colors cursor-pointer z-20 relative"
                                    title="Delete Project"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold">{project.title}</h3>
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-white/20 p-6 rounded-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent outline-none"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Cover Image</label>
                                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-accent/50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    {croppedImageBlob ? (
                                        <div className="text-green-400 flex items-center justify-center gap-2">
                                            <CheckCircle2 className="h-5 w-5" /> Image Cropped & Ready
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 flex flex-col items-center">
                                            <ImageIcon className="h-8 w-8 mb-2" />
                                            <span className="text-sm">Click to upload & crop</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <button type="submit" className="btn-primary">Save Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Cropper Modal */}
            {showCropper && (
                <ImageCropperModal
                    imageSrc={selectedImage}
                    aspect={4 / 3} // Project Ratio
                    onCancel={() => { setShowCropper(false); setSelectedImage(null); }}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
};


export default AdminProjects;
