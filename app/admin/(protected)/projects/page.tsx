import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, Filter, MoreVertical, Edit, Trash, Eye } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Projects | Admin',
};

// Mock data
const projects = [
    { id: 1, title: 'Autonomous Mobile Robot', category: 'Robotics', status: 'published', views: 1240, date: '2025-01-15' },
    { id: 2, title: 'Industrial PLC System', category: 'Automation', status: 'published', views: 856, date: '2024-12-10' },
    { id: 3, title: 'CV Quality Inspection', category: 'AI/ML', status: 'draft', views: 0, date: '2025-02-01' },
];

export default function ProjectsPage() {
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

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input placeholder="Search projects..." className="pl-10" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter size={16} /> Filter
                        </Button>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Project Name</th>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Category</th>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Views</th>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Created</th>
                                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                {projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{project.title}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{project.category}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={project.status === 'published' ? 'default' : 'secondary'}
                                                className={project.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                                            >
                                                {project.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{project.views}</td>
                                        <td className="px-4 py-3 text-gray-500">{project.date}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/projects/${project.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Edit size={16} />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <Trash size={16} />
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
        </div>
    );
}
