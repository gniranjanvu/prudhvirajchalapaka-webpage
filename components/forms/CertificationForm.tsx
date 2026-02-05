"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import TagsInput from '@/components/ui/TagsInput';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CertificationFormProps {
    initialData?: any;
}

export default function CertificationForm({ initialData }: CertificationFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            issuer: '',
            issueDate: '',
            expiryDate: '',
            noExpiry: false,
            credentialId: '',
            credentialUrl: '',
            certificateFile: '', // URL to file
            description: '',
            relatedSkills: []
        }
    });

    const noExpiry = watch('noExpiry');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Certification Data:', data);

            toast({
                title: initialData ? "Certification Updated" : "Certification Added",
                description: "Successfully saved.",
                type: "success"
            });

            router.push('/admin/certifications');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save certification.",
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
                <Link href="/admin/certifications" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Certifications
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Certificate' : 'Add Certificate'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Certification Name</label>
                                <Input
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="e.g. AWS Certified Solutions Architect"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Issuing Organization</label>
                                <Input
                                    {...register('issuer', { required: 'Issuer is required' })}
                                    placeholder="e.g. Amazon Web Services"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Credential ID</label>
                                    <Input {...register('credentialId')} placeholder="Optional ID" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Credential URL</label>
                                    <Input {...register('credentialUrl')} placeholder="https://..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Textarea
                                    {...register('description')}
                                    placeholder="Brief description of what this certification covers..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Related Skills</label>
                                <Controller
                                    name="relatedSkills"
                                    control={control}
                                    render={({ field }) => (
                                        <TagsInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Add related skill..."
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
                                <label className="block text-sm font-medium mb-2">Certificate Image/PDF</label>
                                <Controller
                                    name="certificateFile"
                                    control={control}
                                    render={({ field }) => (
                                        <ImageUpload
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                <p className="text-xs text-gray-500 mt-2">Upload a scan or digital badge.</p>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500">Issue Date</label>
                                    <Input type="date" {...register('issueDate', { required: 'Issue date is required' })} />
                                </div>

                                {!noExpiry && (
                                    <div className="animate-fade-in">
                                        <label className="text-xs text-gray-500">Expiration Date</label>
                                        <Input type="date" {...register('expiryDate')} />
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        {...register('noExpiry')}
                                        id="noExpiry"
                                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                    <label htmlFor="noExpiry" className="text-sm">This certification does not expire</label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
