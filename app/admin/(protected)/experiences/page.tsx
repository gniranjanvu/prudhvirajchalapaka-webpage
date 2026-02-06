'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { format } from 'date-fns';

interface Experience {
    id: string;
    role: string;
    company_name: string;
    employment_type: string;
    location: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    is_published: boolean;
    display_order: number;
}

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchExperiences = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/experiences');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch experiences');
            }

            setExperiences(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching experiences:', err);
            setError(err instanceof Error ? err.message : 'Failed to load experiences');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/experiences/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete experience');
            }

            toast({
                title: "Experience Deleted",
                description: "The experience has been removed successfully.",
                type: "success"
            });

            // Refresh the list
            fetchExperiences();
        } catch (err) {
            console.error('Error deleting experience:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete experience.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM yyyy');
        } catch {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Experience Manager</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your work history and experiences</p>
                </div>
                <Link href="/admin/experiences/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Experience
                    </Button>
                </Link>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchExperiences}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {experiences.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No experiences yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Add your first work experience to get started
                        </p>
                        <Link href="/admin/experiences/new">
                            <Button variant="accent">Add Experience</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {experiences.map((exp) => (
                        <Card key={exp.id} className="group hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{exp.role}</h3>
                                            {exp.is_current && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">
                                                    Current
                                                </span>
                                            )}
                                            {!exp.is_published && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-medium text-gray-900 dark:text-gray-300">{exp.company_name}</span>
                                            <span>•</span>
                                            <span className="capitalize">{exp.employment_type?.replace('-', ' ')}</span>
                                            <span>•</span>
                                            <span>
                                                {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/experiences/${exp.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit size={16} />
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => handleDelete(exp.id)}
                                        disabled={deletingId === exp.id}
                                    >
                                        {deletingId === exp.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash size={16} />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
