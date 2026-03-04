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
import { Loader2, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { slugify } from '@/lib/utils/helpers';
import Link from 'next/link';

const LINK_TYPES = [
    { value: 'github', label: 'GitHub' },
    { value: 'source_code', label: 'Source Code' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'video', label: 'Video' },
    { value: 'demo', label: 'Live Demo' },
    { value: 'images', label: 'Images/Gallery' },
    { value: 'other', label: 'Other' },
];

interface ActionButton {
    type: string;
    label: string;
    url: string;
}

interface ProjectFormProps {
    initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [actionButtons, setActionButtons] = useState<ActionButton[]>(
        initialData?.actionButtons || []
    );
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
            heroImage: '', // Hero image URL
            githubUrl: '',
            demoUrl: '',
            documentationUrl: '',
            featured: false,
            enableComments: true,
            enableLikes: true,
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
            const url = initialData?.id
                ? `/api/projects/${initialData.id}`
                : '/api/projects';
            const method = initialData?.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    slug: data.slug,
                    short_description: data.description,
                    full_description: data.content,
                    tech_stack: data.technologies,
                    gallery_urls: data.images,
                    hero_image_url: data.heroImage || null,
                    github_url: data.githubUrl,
                    demo_url: data.demoUrl,
                    documentation_url: data.documentationUrl || null,
                    is_featured: data.featured,
                    enable_comments: data.enableComments,
                    enable_likes: data.enableLikes,
                    action_buttons: actionButtons.filter(b => b.url.trim()),
                    status: data.status,
                    development_date: data.startDate || null,
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save project');
            }

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
                description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
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
                            <label className="block text-sm font-medium mb-4">Hero Image</label>
                            <Controller
                                name="heroImage"
                                control={control}
                                render={({ field }) => (
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(urls: string | string[]) => {
                                            const arr = Array.isArray(urls) ? urls : [urls];
                                            field.onChange(arr[0] || '');
                                        }}
                                    />
                                )}
                            />
                            <p className="text-xs text-gray-400 mt-2">Main image displayed on the project card and detail page.</p>
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

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('enableComments')}
                                    id="enableComments"
                                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="enableComments" className="text-sm font-medium">Enable Comments</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('enableLikes')}
                                    id="enableLikes"
                                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="enableLikes" className="text-sm font-medium">Enable Likes</label>
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

                            <div>
                                <label className="block text-sm font-medium mb-1">Documentation URL</label>
                                <Input {...register('documentationUrl')} placeholder="https://docs...." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium">Project Links / Action Buttons</label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setActionButtons([...actionButtons, { type: 'github', label: '', url: '' }])}
                                >
                                    <Plus size={14} className="mr-1" /> Add Link
                                </Button>
                            </div>
                            <p className="text-xs text-gray-400">Add custom buttons that will appear on the project page.</p>
                            {actionButtons.map((btn, index) => (
                                <div key={index} className="flex gap-2 items-start p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50">
                                    <div className="flex-1 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={btn.type}
                                                onChange={(e) => {
                                                    const updated = [...actionButtons];
                                                    updated[index].type = e.target.value;
                                                    if (e.target.value !== 'other') {
                                                        updated[index].label = LINK_TYPES.find(t => t.value === e.target.value)?.label || '';
                                                    }
                                                    setActionButtons(updated);
                                                }}
                                                className="h-9 px-2 text-sm rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                                            >
                                                {LINK_TYPES.map(t => (
                                                    <option key={t.value} value={t.value}>{t.label}</option>
                                                ))}
                                            </select>
                                            {btn.type === 'other' && (
                                                <Input
                                                    value={btn.label}
                                                    onChange={(e) => {
                                                        const updated = [...actionButtons];
                                                        updated[index].label = e.target.value;
                                                        setActionButtons(updated);
                                                    }}
                                                    placeholder="Button label..."
                                                    className="h-9 text-sm"
                                                />
                                            )}
                                        </div>
                                        <Input
                                            value={btn.url}
                                            onChange={(e) => {
                                                const updated = [...actionButtons];
                                                updated[index].url = e.target.value;
                                                setActionButtons(updated);
                                            }}
                                            placeholder="https://..."
                                            className="h-9 text-sm"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 text-red-500 hover:text-red-700 shrink-0"
                                        onClick={() => setActionButtons(actionButtons.filter((_, i) => i !== index))}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
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
