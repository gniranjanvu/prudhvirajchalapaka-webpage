'use client';

import { useEffect, useState, use } from 'react';
import SkillForm from '@/components/forms/SkillForm';
import { Loader2 } from 'lucide-react';

interface EditSkillPageProps {
    params: Promise<{ id: string }>;
}

export default function EditSkillPage({ params }: EditSkillPageProps) {
    const resolvedParams = use(params);
    const [skill, setSkill] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await fetch(`/api/skills/${resolvedParams.id}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch skill');
                const s = result.data;
                setSkill({
                    id: s.id,
                    name: s.name,
                    category: s.category_id,
                    proficiency: s.proficiency || 3,
                    yearsExperience: s.years_experience || 0,
                    icon: s.icon_url || '',
                    isVisible: s.is_visible !== false,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load skill');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkill();
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
                <h1 className="text-2xl font-bold font-display">Edit Skill</h1>
                <p className="text-gray-500 dark:text-gray-400">Update skill details</p>
            </div>
            <SkillForm initialData={skill} />
        </div>
    );
}
