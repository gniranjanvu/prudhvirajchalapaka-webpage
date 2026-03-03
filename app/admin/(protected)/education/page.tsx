'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Education {
    id: string;
    institution_name: string;
    degree: string;
    major: string;
    location?: string;
    start_year: number;
    end_year?: number;
    is_current: boolean;
    grade?: string;
    is_published: boolean;
}

export default function EducationPage() {
    const [education, setEducation] = useState<Education[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchEducation = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/education');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch education');
            }

            setEducation(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching education:', err);
            setError(err instanceof Error ? err.message : 'Failed to load education');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this education record?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/education/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete education');
            }

            toast({
                title: "Education Deleted",
                description: "The education record has been removed successfully.",
                type: "success"
            });

            fetchEducation();
        } catch (err) {
            console.error('Error deleting education:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete education.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
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
                    <h1 className="text-2xl font-bold font-display">Education</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your academic background</p>
                </div>
                <Link href="/admin/education/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Education
                    </Button>
                </Link>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchEducation}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {education.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No education records yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Add your first education record to get started
                        </p>
                        <Link href="/admin/education/new">
                            <Button variant="accent">Add Education</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {education.map((edu) => (
                        <Card key={edu.id} className="group hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{edu.degree}</h3>
                                            {edu.grade && (
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 font-medium">
                                                    {edu.grade}
                                                </span>
                                            )}
                                            {!edu.is_published && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-medium text-gray-900 dark:text-gray-300">{edu.institution_name}</span>
                                            <span>•</span>
                                            <span>{edu.major}</span>
                                            <span>•</span>
                                            <span>{edu.start_year} - {edu.is_current ? 'Present' : edu.end_year}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/education/${edu.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => handleDelete(edu.id)}
                                        disabled={deletingId === edu.id}
                                    >
                                        {deletingId === edu.id ? (
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
