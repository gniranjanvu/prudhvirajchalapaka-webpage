"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useToast } from '@/components/ui/toast';
import { Loader2 } from 'lucide-react';

export default function SiteConfigForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            siteName: 'Prudhvi Raj Portfolio',
            siteDescription: 'Personal portfolio of Prudhvi Raj Chalapaka',
            contactEmail: 'contact@prudhviraj.in',
            linkedinUrl: 'https://linkedin.com/in/prudhvirajchalapaka',
            githubUrl: 'https://github.com/prudhvirajchalapaka',
            twitterUrl: '',
            maintenanceMode: false,
            seoKeywords: 'Robotics, ROS2, Automation, Portfolio'
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Site Config:', data);
        toast({ title: "Configuration Saved", description: "Global settings updated.", type: "success" });
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Site Configuration</CardTitle>
                    <CardDescription>Global settings for your website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Site Name</label>
                            <Input {...register('siteName')} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Contact Email</label>
                            <Input {...register('contactEmail')} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">SEO Description</label>
                        <Input {...register('siteDescription')} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Keywords</label>
                        <Input {...register('seoKeywords')} placeholder="Comma separated keywords" />
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                        <h4 className="text-sm font-medium mb-4">Social Links</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">LinkedIn URL</label>
                                <Input {...register('linkedinUrl')} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">GitHub URL</label>
                                <Input {...register('githubUrl')} />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">X / Twitter URL</label>
                                <Input {...register('twitterUrl')} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                        <input
                            type="checkbox"
                            {...register('maintenanceMode')}
                            id="maintenanceMode"
                            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="maintenanceMode" className="text-sm font-medium text-red-600 dark:text-red-400">
                            Enable Maintenance Mode
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" variant="accent" disabled={isLoading}>
                            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Configuration
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
