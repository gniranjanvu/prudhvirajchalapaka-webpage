'use client';

import { useEffect, useState, use } from 'react';
import ProjectForm from '@/components/forms/ProjectForm';
import { Loader2 } from 'lucide-react';

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
    const resolvedParams = use(params);
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${resolvedParams.id}`);
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to fetch project');
                }

                // Map DB fields to form fields
                const p = result.data;
                setProject({
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    description: p.short_description || '',
                    content: p.full_description || '',
                    technologies: p.tech_stack || [],
                    images: p.gallery_urls || [],
                    githubUrl: p.github_url || '',
                    demoUrl: p.demo_url || '',
                    featured: p.is_featured || false,
                    status: p.status || 'draft',
                    startDate: p.development_date || '',
                    endDate: '',
                });
            } catch (err) {
                console.error('Error fetching project:', err);
                setError(err instanceof Error ? err.message : 'Failed to load project');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
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
            <div className="max-w-5xl mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Project</h1>
                <p className="text-gray-500 dark:text-gray-400">Update project details</p>
            </div>
            <ProjectForm initialData={project} />
        </div>
    );
}
