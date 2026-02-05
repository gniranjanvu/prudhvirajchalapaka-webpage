import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, BookOpen, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Publications | Admin',
};

// Mock data
const publications = [
    { id: 1, title: 'Comparative Analysis of Robotic Surgery...', publishedIn: 'Elsevier', date: '2024-05', url: '#' },
];

export default function PublicationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Publications</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage research papers and articles</p>
                </div>
                <Link href="/admin/publications/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Publication
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {publications.map((item) => (
                    <Card key={item.id} className="group hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-900 dark:text-gray-300">{item.publishedIn}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                        {item.url && (
                                            <a href={item.url} target="_blank" className="flex items-center gap-1 text-blue-500 hover:underline">
                                                <ExternalLink size={10} /> Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/publications/${item.id}`}>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Edit size={16} />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
