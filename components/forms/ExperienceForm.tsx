"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import TagsInput from '@/components/ui/TagsInput';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ExperienceFormProps {
    initialData?: any;
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            type: 'full-time',
            description: '',
            technologies: [],
            link: ''
        }
    });

    const isCurrent = watch('isCurrent');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Experience Data:', data);

            toast({
                title: initialData ? "Experience Updated" : "Experience Added",
                description: "Your changes have been saved.",
                type: "success"
            });

            router.push('/admin/experiences');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save experience.",
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
                <Link href="/admin/experiences" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Experience
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Experience' : 'Add Experience'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role / Job Title</label>
                                    <Input
                                        {...register('role', { required: 'Role is required' })}
                                        placeholder="e.g. Robotics Engineer"
                                    />
                                    {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message as string}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company Name</label>
                                    <Input
                                        {...register('company', { required: 'Company is required' })}
                                        placeholder="e.g. Acme Robotics"
                                    />
                                    {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company.message as string}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Employment Type</label>
                                    <select
                                        {...register('type')}
                                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
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

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Textarea
                                    {...register('description', { required: 'Description is required' })}
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="min-h-[150px]"
                                />
                                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message as string}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Technologies Used</label>
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
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium">Timeline</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            {...register('isCurrent')}
                                            id="isCurrent"
                                            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                        />
                                        <label htmlFor="isCurrent" className="text-sm">I currently work here</label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500">Start Date</label>
                                        <Input type="date" {...register('startDate', { required: 'Start date is required' })} />
                                    </div>

                                    {!isCurrent && (
                                        <div className="animate-fade-in">
                                            <label className="text-xs text-gray-500">End Date</label>
                                            <Input type="date" {...register('endDate', { required: !isCurrent && 'End date is required' })} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
                                <label className="block text-sm font-medium mb-1">Company Website</label>
                                <Input {...register('link')} placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
