'use client';

import { useEffect, useState, use } from 'react';
import AchievementForm from '@/components/forms/AchievementForm';
import { Loader2 } from 'lucide-react';

interface EditAchievementPageProps {
    params: Promise<{ id: string }>;
}

export default function EditAchievementPage({ params }: EditAchievementPageProps) {
    const resolvedParams = use(params);
    const [achievement, setAchievement] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievement = async () => {
            try {
                const response = await fetch(`/api/achievements/${resolvedParams.id}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch achievement');
                const a = result.data;
                setAchievement({
                    id: a.id,
                    title: a.title,
                    dateAchieved: a.date_achieved || '',
                    issuer: a.issuer || '',
                    description: a.description || '',
                    category: a.category || 'other',
                    certificateUrl: a.certificate_url || '',
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load achievement');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAchievement();
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
                <h1 className="text-2xl font-bold font-display">Edit Achievement</h1>
                <p className="text-gray-500 dark:text-gray-400">Update details</p>
            </div>
            <AchievementForm initialData={achievement} />
        </div>
    );
}
