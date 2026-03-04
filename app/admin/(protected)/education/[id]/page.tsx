'use client';

import { useEffect, useState, use } from 'react';
import EducationForm from '@/components/forms/EducationForm';
import { Loader2 } from 'lucide-react';

interface EditEducationPageProps {
    params: Promise<{ id: string }>;
}

export default function EditEducationPage({ params }: EditEducationPageProps) {
    const resolvedParams = use(params);
    const [education, setEducation] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await fetch(`/api/education/${resolvedParams.id}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch education');
                const e = result.data;
                setEducation({
                    id: e.id,
                    degree: e.degree,
                    major: e.major,
                    institution: e.institution_name,
                    location: e.location || '',
                    startDate: e.start_year?.toString() || '',
                    endDate: e.end_year?.toString() || '',
                    isCurrent: e.is_current || false,
                    grade: e.grade || '',
                    description: e.description || '',
                    keyCourses: e.key_courses || [],
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load education');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEducation();
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
                <h1 className="text-2xl font-bold font-display">Edit Education</h1>
                <p className="text-gray-500 dark:text-gray-400">Update academic details</p>
            </div>
            <EducationForm initialData={education} />
        </div>
    );
}
