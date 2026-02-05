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

interface EducationFormProps {
    initialData?: any;
}

export default function EducationForm({ initialData }: EducationFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            degree: '',
            major: '', // e.g. Electronics and Communication Engineering
            institution: '', // University name
            location: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            grade: '', // CGPA/Percentage
            description: '',
            keyCourses: [] // Tags
        }
    });

    const isCurrent = watch('isCurrent');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Education Data:', data);

            toast({
                title: initialData ? "Education Updated" : "Education Added",
                description: "Your academic details have been saved.",
                type: "success"
            });

            router.push('/admin/education');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save details.",
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
                <Link href="/admin/education" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Education
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Education' : 'Add Education'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Degree</label>
                                    <Input
                                        {...register('degree', { required: 'Degree is required' })}
                                        placeholder="e.g. Bachelor of Technology"
                                    />
                                    {errors.degree && <p className="text-sm text-red-500 mt-1">{errors.degree.message as string}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Major / Field of Study</label>
                                    <Input
                                        {...register('major', { required: 'Major is required' })}
                                        placeholder="e.g. Electronics & Communication"
                                    />
                                    {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major.message as string}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Institution / University</label>
                                <Input
                                    {...register('institution', { required: 'Institution is required' })}
                                    placeholder="e.g. Vignan's University"
                                />
                                {errors.institution && <p className="text-sm text-red-500 mt-1">{errors.institution.message as string}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Grade / CGPA</label>
                                    <Input {...register('grade')} placeholder="e.g. 8.5/10" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Location</label>
                                    <Input {...register('location')} placeholder="e.g. Guntur, India" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description / Activities</label>
                                <Textarea
                                    {...register('description')}
                                    placeholder="Describe your achievements, clubs, etc..."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Key Courses / Highlights</label>
                                <Controller
                                    name="keyCourses"
                                    control={control}
                                    render={({ field }) => (
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Add course..."
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
                                        <label htmlFor="isCurrent" className="text-sm">Current Student</label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500">Start Year</label>
                                        <Input type="number" {...register('startDate', { required: 'Start year is required' })} placeholder="YYYY" />
                                    </div>

                                    {!isCurrent && (
                                        <div className="animate-fade-in">
                                            <label className="text-xs text-gray-500">End Year</label>
                                            <Input type="number" {...register('endDate', { required: !isCurrent && 'End year is required' })} placeholder="YYYY" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
