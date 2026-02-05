import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash, Star } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Skills | Admin',
};

// Mock data
const categories = [
    {
        id: 'programming',
        name: 'Programming Languages',
        skills: [
            { id: 1, name: 'Python', proficiency: 5 },
            { id: 2, name: 'C++', proficiency: 4 },
            { id: 3, name: 'TypeScript', proficiency: 3 },
        ]
    },
    {
        id: 'frameworks',
        name: 'Frameworks & Tools',
        skills: [
            { id: 4, name: 'ROS2', proficiency: 5 },
            { id: 5, name: 'React', proficiency: 4 },
            { id: 6, name: 'Docker', proficiency: 3 },
        ]
    },
];

export default function SkillsPage() {
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
                                            <button className="p-1 hover:text-red-500 transition-colors"><Trash size={14} /></button>
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
        </div>
    );
}
