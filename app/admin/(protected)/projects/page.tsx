'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash, FolderOpen, Loader2, AlertCircle, MessageSquare, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { format } from 'date-fns';

interface Project {
    id: string;
    title: string;
    slug: string;
    status: string;
    views_count: number;
    likes_count: number;
    is_featured: boolean;
    enable_comments: boolean;
    enable_likes: boolean;
    created_at: string;
    development_date?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/projects');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch projects');
            }

            setProjects(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError(err instanceof Error ? err.message : 'Failed to load projects');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete project');
            }

            toast({
                title: "Project Deleted",
                description: "The project has been removed successfully.",
                type: "success"
            });

            fetchProjects();
        } catch (err) {
            console.error('Error deleting project:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete project.",
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
                    <h1 className="text-2xl font-bold font-display">Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your portfolio projects</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Project
                    </Button>
                </Link>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchProjects}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {projects.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <FolderOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Add your first project to get started
                        </p>
                        <Link href="/admin/projects/new">
                            <Button variant="accent">Add Project</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="rounded-lg overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-zinc-800/50">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Project Name</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Views</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Likes</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                                        <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">
                                                <div className="flex items-center gap-2">
                                                    {project.title}
                                                    {project.is_featured && (
                                                        <span className="px-1.5 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 rounded">Featured</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={project.status === 'published' ? 'default' : 'secondary'}
                                                    className={project.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                                                >
                                                    {project.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">{project.views_count ?? 0}</td>
                                            <td className="px-4 py-3 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Heart size={14} className="text-pink-500" />
                                                    {project.likes_count ?? 0}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {project.development_date ? formatDate(project.development_date) : formatDate(project.created_at)}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/projects/${project.id}/comments`}>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Manage Comments">
                                                            <MessageSquare size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/projects/${project.id}`}>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Edit size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        onClick={() => handleDelete(project.id)}
                                                        disabled={deletingId === project.id}
                                                    >
                                                        {deletingId === project.id ? (
                                                            <Loader2 size={16} className="animate-spin" />
                                                        ) : (
                                                            <Trash size={16} />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
