import { Metadata } from 'next';
import DashboardStats from '@/components/admin/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Dashboard | Admin',
    description: 'Overview of portfolio activity',
};

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Welcome back, here's what's happening with your portfolio.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/" target="_blank">
                        <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" /> Visit Site
                        </Button>
                    </Link>
                    <Link href="/admin/projects/new">
                        <Button className="gap-2 variant-accent">
                            <Plus className="w-4 h-4" /> New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <DashboardStats />

            {/* Recent Activity & Quick Links */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 ring-4 ring-blue-50 dark:ring-blue-900/20" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                                            Project "Autonomous Robot" was updated
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            2 hours ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Link href="/admin/experiences/new">
                                <Button variant="ghost" className="w-full justify-start gap-2 h-12">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    Add Experience
                                </Button>
                            </Link>
                            <Link href="/admin/publications/new">
                                <Button variant="ghost" className="w-full justify-start gap-2 h-12">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    Add Publication
                                </Button>
                            </Link>
                            <Link href="/admin/messages">
                                <Button variant="ghost" className="w-full justify-start gap-2 h-12">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                    View Messages
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
