"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import TagsInput from '@/components/ui/TagsInput';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUpload from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowLeft, Image, Video, Award } from 'lucide-react';
import Link from 'next/link';

interface ExperienceFormData {
    role: string;
    company_name: string;
    location: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    employment_type: string;
    description: string;
    tech_stack: string[];
    hero_image_url: string;
    certificate_url: string;
    gallery_urls: string[];
    video_urls: string[];
    display_order: number;
    is_published: boolean;
}

interface ExperienceFormProps {
    initialData?: Partial<ExperienceFormData> & { id?: string };
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ExperienceFormData>({
        defaultValues: {
            role: initialData?.role || '',
            company_name: initialData?.company_name || '',
            location: initialData?.location || '',
            start_date: initialData?.start_date || '',
            end_date: initialData?.end_date || '',
            is_current: initialData?.is_current || false,
            employment_type: initialData?.employment_type || 'full-time',
            description: initialData?.description || '',
            tech_stack: initialData?.tech_stack || [],
            hero_image_url: initialData?.hero_image_url || '',
            certificate_url: initialData?.certificate_url || '',
            gallery_urls: initialData?.gallery_urls || [],
            video_urls: initialData?.video_urls || [],
            display_order: initialData?.display_order ?? 0,
            is_published: initialData?.is_published ?? false
        }
    });

    const isCurrent = watch('is_current');
    const videoUrls = watch('video_urls');

    const onSubmit = async (data: ExperienceFormData) => {
        setIsLoading(true);
        try {
            const url = initialData?.id 
                ? `/api/experiences/${initialData.id}` 
                : '/api/experiences';
            
            const method = initialData?.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save experience');
            }

            toast({
                title: initialData?.id ? "Experience Updated" : "Experience Added",
                description: "Your changes have been saved successfully.",
                type: "success"
            });

            router.push('/admin/experiences');
            router.refresh();
        } catch (error) {
            console.error('Error saving experience:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save experience.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?.id) return;
        
        if (!confirm('Are you sure you want to delete this experience? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/experiences/${initialData.id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete experience');
            }

            toast({
                title: "Experience Deleted",
                description: "The experience has been removed.",
                type: "success"
            });

            router.push('/admin/experiences');
            router.refresh();
        } catch (error) {
            console.error('Error deleting experience:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete experience.",
                type: "error"
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const addVideoUrl = () => {
        const currentUrls = videoUrls || [];
        setValue('video_urls', [...currentUrls, '']);
    };

    const updateVideoUrl = (index: number, value: string) => {
        const currentUrls = [...(videoUrls || [])];
        currentUrls[index] = value;
        setValue('video_urls', currentUrls);
    };

    const removeVideoUrl = (index: number) => {
        const currentUrls = videoUrls?.filter((_, i) => i !== index) || [];
        setValue('video_urls', currentUrls);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <Link href="/admin/experiences" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Experiences
                </Link>
                <div className="flex gap-3">
                    {initialData?.id && (
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    )}
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData?.id ? 'Update Experience' : 'Add Experience'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role / Job Title *</label>
                                    <Input
                                        {...register('role', { required: 'Role is required' })}
                                        placeholder="e.g. Robotics Engineer"
                                    />
                                    {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company Name *</label>
                                    <Input
                                        {...register('company_name', { required: 'Company is required' })}
                                        placeholder="e.g. Acme Robotics"
                                    />
                                    {errors.company_name && <p className="text-sm text-red-500 mt-1">{errors.company_name.message}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Employment Type</label>
                                    <select
                                        {...register('employment_type')}
                                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-purple-500/20"
                                    >
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="contract">Contract</option>
                                        <option value="internship">Internship</option>
                                        <option value="freelance">Freelance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <Input {...register('location')} placeholder="e.g. Remote, San Francisco" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description - Rich Text */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Description</h3>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Describe your responsibilities, achievements, and key projects..."
                                    />
                                )}
                            />
                            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                        </CardContent>
                    </Card>

                    {/* Technologies */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Technologies & Skills</h3>
                            <Controller
                                name="tech_stack"
                                control={control}
                                render={({ field }) => (
                                    <TagsInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Add technology (press Enter)..."
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Media Section */}
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Image size={20} className="text-purple-500" />
                                Hero Image
                            </h3>
                            <div>
                                <label className="block text-sm font-medium mb-2">Hero Image URL</label>
                                <Input 
                                    {...register('hero_image_url')} 
                                    placeholder="https://example.com/image.jpg or upload below"
                                />
                                <p className="text-xs text-gray-500 mt-1">This image will be displayed on the experience card</p>
                            </div>
                            <Controller
                                name="hero_image_url"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(value) => field.onChange(Array.isArray(value) ? value[0] : value)}
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Gallery Images */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Image size={20} className="text-purple-500" />
                                Gallery Images
                            </h3>
                            <p className="text-sm text-gray-500">Add multiple images to showcase your work</p>
                            <Controller
                                name="gallery_urls"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(value) => field.onChange(Array.isArray(value) ? value : [value])}
                                        multiple
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Video URLs */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Video size={20} className="text-purple-500" />
                                    Video URLs
                                </h3>
                                <Button type="button" variant="outline" size="sm" onClick={addVideoUrl}>
                                    Add Video
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500">Add YouTube or other video URLs</p>
                            
                            {videoUrls && videoUrls.length > 0 ? (
                                <div className="space-y-3">
                                    {videoUrls.map((url, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={url}
                                                onChange={(e) => updateVideoUrl(index, e.target.value)}
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="flex-1"
                                            />
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => removeVideoUrl(index)}
                                                className="text-red-500"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No videos added yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    {/* Timeline */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold">Timeline</h3>
                            
                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
                                <input
                                    type="checkbox"
                                    {...register('is_current')}
                                    id="is_current"
                                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="is_current" className="text-sm font-medium">Currently working here</label>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-500">Start Date *</label>
                                    <Input 
                                        type="date" 
                                        {...register('start_date', { required: 'Start date is required' })} 
                                    />
                                    {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date.message}</p>}
                                </div>

                                {!isCurrent && (
                                    <div className="animate-fade-in">
                                        <label className="text-sm text-gray-500">End Date</label>
                                        <Input 
                                            type="date" 
                                            {...register('end_date')} 
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certificate */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Award size={20} className="text-purple-500" />
                                Certificate
                            </h3>
                            <div>
                                <label className="block text-sm font-medium mb-1">Certificate URL</label>
                                <Input 
                                    {...register('certificate_url')} 
                                    placeholder="https://example.com/certificate.pdf"
                                />
                                <p className="text-xs text-gray-500 mt-1">Link to your work certificate or letter</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Display Settings */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-semibold">Display Settings</h3>
                            
                            <div>
                                <label className="block text-sm font-medium mb-1">Display Order</label>
                                <Input 
                                    type="number" 
                                    {...register('display_order', { valueAsNumber: true })} 
                                    placeholder="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
                                <input
                                    type="checkbox"
                                    {...register('is_published')}
                                    id="is_published"
                                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="is_published" className="text-sm font-medium">Published</label>
                            </div>
                            <p className="text-xs text-gray-500">Only published experiences are visible to the public</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
