import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ImageUpload({ onUpload, defaultValue, bucket = 'media', label = 'Image' }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(defaultValue || '');

    const uploadImage = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            const publicUrl = data.publicUrl;
            setPreview(publicUrl);
            onUpload(publicUrl);

        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview('');
        onUpload('');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            
            {preview ? (
                <div className="relative group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Remove image"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                        {preview}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors cursor-pointer group relative">
                    <div className="space-y-1 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                <span>{uploading ? 'Uploading...' : 'Upload a file'}</span>
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={uploadImage}
                                    disabled={uploading}
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            )}
            
            {!preview && !uploading && (
                <div className="mt-1">
                    <p className="text-xs text-gray-400 italic">or paste a URL below in the direct input</p>
                </div>
            )}
        </div>
    );
}
