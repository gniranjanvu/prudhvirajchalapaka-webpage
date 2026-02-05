"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUpload from '@/components/ui/ImageUpload';
import TagsInput from '@/components/ui/TagsInput';
import { useToast } from '@/components/ui/toast';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { slugify } from '@/lib/utils/helpers';
import Link from 'next/link';

interface ProjectFormProps {
    initialData?: any; // Replace with proper type
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: '',
            slug: '',
            category: '',
            description: '', // Short description
            content: '', // Full description (Rich Text)
            technologies: [],
            images: [],
            githubUrl: '',
            demoUrl: '',
            featured: false,
            status: 'draft',
            startDate: '',
            endDate: ''
        }
    });

    // Auto-generate slug from title
    const title = watch('title');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('title', e.target.value);
        if (!initialData) {
            setValue('slug', slugify(e.target.value));
        }
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form Data:', data);

            toast({
                title: initialData ? "Project Updated" : "Project Created",
                description: "Your changes have been saved successfully.",
                type: "success"
            });

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link href="/admin/projects" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Project' : 'Create Project'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Project Title</label>
                                    <Input
                                        {...register('title', { required: 'Title is required' })}
                                        onChange={handleTitleChange}
                                        placeholder="e.g. Autonomous Mobile Robot"
                                    />
                                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message as string}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug</label>
                                    <Input
                                        {...register('slug', { required: 'Slug is required' })}
                                        placeholder="autonomous-mobile-robot"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Short Description</label>
                                    <textarea
                                        {...register('description')}
                                        className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                        placeholder="Brief summary for the card view..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <label className="block text-sm font-medium mb-2">Full Case Study</label>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Write detailed project documentation..."
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <label className="block text-sm font-medium mb-4">Project Gallery</label>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        multiple
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    {...register('status')}
                                    className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    {...register('category', { required: 'Category is required' })}
                                    className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Robotics">Robotics</option>
                                    <option value="Automation">Automation</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="IoT">IoT</option>
                                    <option value="Web Dev">Web Dev</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('featured')}
                                    id="featured"
                                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="featured" className="text-sm font-medium">Feature on Homepage</label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tech Stack</label>
                                <Controller
                                    name="technologies"
                                    control={control}
                                    render={({ field }) => (
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Add tech..."
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                                <Input {...register('githubUrl')} placeholder="https://github.com/..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Demo/Live URL</label>
                                <Input {...register('demoUrl')} placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <Input type="date" {...register('startDate')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <Input type="date" {...register('endDate')} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
