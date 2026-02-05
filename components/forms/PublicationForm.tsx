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

interface PublicationFormProps {
    initialData?: any;
}

export default function PublicationForm({ initialData }: PublicationFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: '',
            publishedIn: '',
            publisher: '',
            date: '',
            url: '',
            doi: '',
            abstract: '',
            authors: [],
            tags: []
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Publication Data:', data);

            toast({
                title: initialData ? "Publication Updated" : "Publication Added",
                description: "Successfully saved.",
                type: "success"
            });

            router.push('/admin/publications');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save publication.",
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
                <Link href="/admin/publications" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Publications
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Publication' : 'Add Publication'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Paper Title</label>
                                <Input
                                    {...register('title', { required: 'Title is required' })}
                                    placeholder="e.g. Comparative Analysis of..."
                                />
                                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message as string}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Published In (Journal/Conf)</label>
                                    <Input {...register('publishedIn', { required: 'Publication venue is required' })} placeholder="e.g. Elsevier" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Publisher</label>
                                    <Input {...register('publisher')} placeholder="e.g. IEEE, Springer" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Abstract</label>
                                <Textarea
                                    {...register('abstract')}
                                    placeholder="Paste the abstract here..."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Publication Date</label>
                                <Input type="date" {...register('date', { required: 'Date is required' })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">DOI</label>
                                <Input {...register('doi')} placeholder="10.1000/xyz..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Read URL</label>
                                <Input {...register('url')} placeholder="https://..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Co-Authors</label>
                                <Controller
                                    name="authors"
                                    control={control}
                                    render={({ field }) => (
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Add author..."
                                        />
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tags / Keywords</label>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) => (
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Add keyword..."
                                        />
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
