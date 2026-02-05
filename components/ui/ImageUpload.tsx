"use client";

import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface ImageUploadProps {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    disabled?: boolean;
    multiple?: boolean;
}

export default function ImageUpload({ value, onChange, disabled, multiple = false }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Helper to handle single vs multiple values
    const values = Array.isArray(value) ? value : (value ? [value] : []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        // Simulate upload - In real app, upload to Supabase Storage here
        setIsLoading(true);
        try {
            // Mock upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock result URLs (using placeholders for now)
            const newUrls = files.map(file => URL.createObjectURL(file));

            if (multiple) {
                onChange([...values, ...newUrls]);
            } else {
                onChange(newUrls[0]);
            }
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setIsLoading(false);
        }
    }, [disabled, multiple, onChange, values]);

    const handleRemove = (urlToRemove: string) => {
        if (multiple) {
            onChange(values.filter(url => url !== urlToRemove));
        } else {
            onChange('');
        }
    };

    return (
        <div className="space-y-4">
            {/* Preview Grid */}
            {values.length > 0 && (
                <div className={cn("grid gap-4", multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}>
                    {values.map((url) => (
                        <div key={url} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-800 group">
                            <Image
                                src={url}
                                alt="Upload"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(url)}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Drop Zone */}
            {(multiple || values.length === 0) && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 transition-colors flex flex-col items-center justify-center cursor-pointer",
                        isDragging
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10"
                            : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div className="mb-4 p-4 rounded-full bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm">
                        {isLoading ? (
                            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8 text-gray-400" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            SVG, PNG, JPG or GIF (max. 10MB)
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            // Handle file input logic similar to drop
                            // Simplified for this artifact
                        }}
                        accept="image/*"
                        multiple={multiple}
                        disabled={disabled}
                    />
                </div>
            )}
        </div>
    );
}
