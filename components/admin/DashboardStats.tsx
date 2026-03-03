'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import {
    FolderOpen,
    MessageSquare,
    Briefcase,
    BookOpen,
    ArrowUpRight,
    Loader2
} from "lucide-react";

interface DashboardData {
    totalProjects: number;
    newMessages: number;
    totalExperiences: number;
    totalPublications: number;
}

export default function DashboardStats() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/dashboard/stats');
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                }
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        {
            title: "Total Projects",
            value: data?.totalProjects ?? 0,
            icon: FolderOpen,
            color: "bg-purple-500",
        },
        {
            title: "Unread Messages",
            value: data?.newMessages ?? 0,
            icon: MessageSquare,
            color: "bg-orange-500",
        },
        {
            title: "Experiences",
            value: data?.totalExperiences ?? 0,
            icon: Briefcase,
            color: "bg-blue-500",
        },
        {
            title: "Publications",
            value: data?.totalPublications ?? 0,
            icon: BookOpen,
            color: "bg-pink-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            {!isLoading && (
                                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            )}
                        </div>

                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {stat.title}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                            ) : (
                                stat.value
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
