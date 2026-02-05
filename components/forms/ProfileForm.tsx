"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

export default function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: 'Prudhvi Raj Chalapaka',
            title: 'Robotics & Automation Engineer',
            email: 'prudhvirajchalapaka07@gmail.com',
            phone: '+91 7995511692',
            location: 'Guntur, India',
            bio: 'Ambitious Robotics & Automation Engineer...',
            avatar_url: ''
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Profile Data:', data);

            toast({
                title: "Profile Updated",
                description: "Your profile information has been saved.",
                type: "success"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details display on the portfolio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <Input {...register('name')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Professional Title</label>
                                <Input {...register('title')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input {...register('email')} type="email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <Input {...register('phone')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <Input {...register('location')} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium mb-1">Profile Picture</label>
                            {/* Simplified for demo */}
                            <div className="border-2 border-dashed rounded-lg p-4 text-center h-48 flex items-center justify-center bg-gray-50 dark:bg-zinc-900/50">
                                <p className="text-sm text-gray-500">Image Upload Component</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <Textarea {...register('bio')} className="min-h-[120px]" />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" variant="accent" disabled={isLoading}>
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
