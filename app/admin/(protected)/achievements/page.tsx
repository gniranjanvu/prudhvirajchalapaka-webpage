import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash, Trophy } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Achievements | Admin',
};

// Mock data
const achievements = [
    { id: 1, title: 'Smart India Hackathon Finalist', category: 'competition', date: '2023-11-01', issuer: 'Govt. of India' },
    { id: 2, title: 'Robotics Club Lead', category: 'leadership', date: '2023-2024', issuer: 'University' },
];

export default function AchievementsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Achievements</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track your awards and recognition</p>
                </div>
                <Link href="/admin/achievements/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Achievement
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {achievements.map((item) => (
                    <Card key={item.id} className="group hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600">
                                    <Trophy size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="capitalize px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-medium">
                                            {item.category}
                                        </span>
                                        <span>•</span>
                                        <span className="font-medium text-gray-900 dark:text-gray-300">{item.issuer}</span>
                                        <span>•</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/achievements/${item.id}`}>
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
