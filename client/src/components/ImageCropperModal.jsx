import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import { X, Check } from 'lucide-react';
import getCroppedImg from '../utils/cropImage';

const ImageCropperModal = ({ imageSrc, onCancel, onCropComplete, aspect = 450 / 350 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            );
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/20 p-6 rounded-xl w-full max-w-2xl flex flex-col h-[90vh]">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Crop Image</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="relative flex-1 bg-black rounded-lg overflow-hidden border border-white/10 mb-6">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={onZoomChange}
                        classes={{ containerClassName: 'rounded-lg' }}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-white text-sm">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="w-full accent-accent h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={showCroppedImage}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Check className="h-4 w-4" />
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageCropperModal;
