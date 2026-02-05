"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useToast } from '@/components/ui/toast';
import { Loader2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

interface SkillFormProps {
    initialData?: any;
}

export default function SkillForm({ initialData }: SkillFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '',
            category: 'programming',
            proficiency: 3, // 1-5
            yearsExperience: 0,
            icon: '',
            isVisible: true
        }
    });

    const proficiency = watch('proficiency');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Skill Data:', data);

            toast({
                title: initialData ? "Skill Updated" : "Skill Added",
                description: "Skill details saved successfully.",
                type: "success"
            });

            router.push('/admin/skills');
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save skill.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link href="/admin/skills" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Skills
                </Link>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="accent" disabled={isLoading}>
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {initialData ? 'Update Skill' : 'Add Skill'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Skill Name</label>
                        <Input
                            {...register('name', { required: 'Name is required' })}
                            placeholder="e.g. Python"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                {...register('category')}
                                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                            >
                                <option value="programming">Programming Languages</option>
                                <option value="frameworks">Frameworks & Libraries</option>
                                <option value="hardware">Hardware</option>
                                <option value="tools">Tools & Software</option>
                                <option value="ml">Machine Learning</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Years of Experience</label>
                            <Input
                                type="number"
                                step="0.1"
                                {...register('yearsExperience')}
                                placeholder="e.g. 2.5"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Proficiency (1-5)</label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setValue('proficiency', level)}
                                    className={`p-2 rounded-lg transition-colors ${level <= proficiency
                                            ? 'text-yellow-400 bg-yellow-400/10'
                                            : 'text-gray-300 hover:text-gray-400'
                                        }`}
                                >
                                    <Star size={24} fill={level <= proficiency ? "currentColor" : "none"} />
                                </button>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                                {proficiency === 1 && "Beginner"}
                                {proficiency === 2 && "Elementary"}
                                {proficiency === 3 && "Intermediate"}
                                {proficiency === 4 && "Advanced"}
                                {proficiency === 5 && "Expert"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Icon Identifier (SimpleIcons/Lucide)</label>
                        <Input {...register('icon')} placeholder="e.g. python, react, cpu" />
                        <p className="text-xs text-gray-500 mt-1">Use icon names from SimpleIcons or Lucide</p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-zinc-800">
                        <input
                            type="checkbox"
                            {...register('isVisible')}
                            id="isVisible"
                            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="isVisible" className="text-sm font-medium">Visible on Portfolio</label>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
