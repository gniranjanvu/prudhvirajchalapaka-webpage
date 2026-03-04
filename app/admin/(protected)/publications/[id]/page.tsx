'use client';

import { useEffect, useState, use } from 'react';
import PublicationForm from '@/components/forms/PublicationForm';
import { Loader2 } from 'lucide-react';

interface EditPublicationPageProps {
    params: Promise<{ id: string }>;
}

export default function EditPublicationPage({ params }: EditPublicationPageProps) {
    const resolvedParams = use(params);
    const [publication, setPublication] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const response = await fetch(`/api/publications/${resolvedParams.id}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch publication');
                const p = result.data;
                setPublication({
                    id: p.id,
                    title: p.title,
                    publishedIn: p.venue || '',
                    publisher: p.publication_type || 'journal',
                    date: p.publication_date || '',
                    url: p.pdf_url || '',
                    doi: p.doi_url || '',
                    abstract: p.abstract || '',
                    authors: Array.isArray(p.authors)
                        ? p.authors.map((a: any) => typeof a === 'string' ? a : a.name || '')
                        : [],
                    tags: p.keywords || [],
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load publication');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPublication();
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
                <h1 className="text-2xl font-bold font-display">Edit Publication</h1>
                <p className="text-gray-500 dark:text-gray-400">Update publication details</p>
            </div>
            <PublicationForm initialData={publication} />
        </div>
    );
}
