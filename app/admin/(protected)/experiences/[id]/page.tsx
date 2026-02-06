'use client';

import { useEffect, useState, use } from 'react';
import ExperienceForm from '@/components/forms/ExperienceForm';
import { Loader2 } from 'lucide-react';

interface EditExperiencePageProps {
    params: Promise<{ id: string }>;
}

export default function EditExperiencePage({ params }: EditExperiencePageProps) {
    const resolvedParams = use(params);
    const [experience, setExperience] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await fetch(`/api/experiences/${resolvedParams.id}`);
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to fetch experience');
                }

                setExperience(result.data);
            } catch (err) {
                console.error('Error fetching experience:', err);
                setError(err instanceof Error ? err.message : 'Failed to load experience');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperience();
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Experience</h1>
                <p className="text-gray-500 dark:text-gray-400">Update role details</p>
            </div>
            <ExperienceForm initialData={experience} />
        </div>
    );
}
