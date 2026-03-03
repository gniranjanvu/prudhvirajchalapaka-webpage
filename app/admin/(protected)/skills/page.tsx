'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, Star, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Skill {
    id: string;
    name: string;
    proficiency: number;
    category_id: string;
    skill_categories?: { id: string; name: string };
    is_visible: boolean;
}

interface SkillCategory {
    id: string;
    name: string;
    skills: Skill[];
}

export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchSkills = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/skills');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch skills');
            }

            setSkills(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching skills:', err);
            setError(err instanceof Error ? err.message : 'Failed to load skills');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/skills/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete skill');
            }

            toast({
                title: "Skill Deleted",
                description: "The skill has been removed successfully.",
                type: "success"
            });

            fetchSkills();
        } catch (err) {
            console.error('Error deleting skill:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete skill.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
        }
    };

    // Group skills by category
    const categories: SkillCategory[] = skills.reduce((acc: SkillCategory[], skill) => {
        const catName = skill.skill_categories?.name || 'Uncategorized';
        const catId = skill.skill_categories?.id || skill.category_id;
        const existing = acc.find(c => c.id === catId);
        if (existing) {
            existing.skills.push(skill);
        } else {
            acc.push({ id: catId, name: catName, skills: [skill] });
        }
        return acc;
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Skills</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your technical expertise</p>
                </div>
                <Link href="/admin/skills/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Skill
                    </Button>
                </Link>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchSkills}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {skills.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Star className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No skills yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Add your first skill to get started
                        </p>
                        <Link href="/admin/skills/new">
                            <Button variant="accent">Add Skill</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {categories.map((category) => (
                        <Card key={category.id}>
                            <CardHeader className="pb-3 border-b border-gray-100 dark:border-zinc-800">
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-wrap gap-4">
                                    {category.skills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 group"
                                        >
                                            <div className="font-medium">{skill.name}</div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full ${i < skill.proficiency
                                                            ? 'bg-purple-500'
                                                            : 'bg-gray-300 dark:bg-zinc-700'
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            <div className="pl-2 border-l border-gray-200 dark:border-zinc-800 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/skills/${skill.id}`}>
                                                    <button className="p-1 hover:text-blue-500 transition-colors"><Edit size={14} /></button>
                                                </Link>
                                                <button
                                                    className="p-1 hover:text-red-500 transition-colors"
                                                    onClick={() => handleDelete(skill.id)}
                                                    disabled={deletingId === skill.id}
                                                >
                                                    {deletingId === skill.id ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <Trash size={14} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <Link href="/admin/skills/new">
                                        <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-all">
                                            <Plus size={16} /> <span className="text-sm">Add to {category.name}</span>
                                        </button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
