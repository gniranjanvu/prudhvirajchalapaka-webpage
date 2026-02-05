"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AchievementFormProps {
    initialData?: any;
}

export default function AchievementForm({ initialData }: AchievementFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: '',
            dateAchieved: '',
            issuer: '',
            description: '',
            category: 'other', // award, recognition, competition...
            certificateUrl: '',
            heroImage: ''
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Achievement Data:', data);

            toast({
                title: initialData ? "Achievement Updated" : "Achievement Added",
                description: "Successfully saved.",
                type: "success"
            });

            router.push('/admin/achievements');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save achievement.",
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
                <Link href="/admin/achievements" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Achievements
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Achievement' : 'Add Achievement'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <Input
                                    {...register('title', { required: 'Title is required' })}
                                    placeholder="e.g. Smart India Hackathon Finalist"
                                />
                                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message as string}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Achieved</label>
                                    <Input type="date" {...register('dateAchieved', { required: 'Date is required' })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Issuer / Organization</label>
                                    <Input {...register('issuer')} placeholder="e.g. Government of India" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Textarea
                                    {...register('description')}
                                    placeholder="Details about this achievement..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    {...register('category')}
                                    className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                                >
                                    <option value="award">Award</option>
                                    <option value="recognition">Recognition</option>
                                    <option value="competition">Competition</option>
                                    <option value="leadership">Leadership</option>
                                    <option value="milestone">Milestone</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Proof URL / Certificate</label>
                                <Input {...register('certificateUrl')} placeholder="https://..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
