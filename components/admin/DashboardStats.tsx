import { Card, CardContent } from "@/components/ui/Card";
import {
    FolderOpen,
    Eye,
    MessageSquare,
    Users,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

const stats = [
    {
        title: "Total Projects",
        value: "12",
        change: "+2",
        trend: "up",
        icon: FolderOpen,
        color: "bg-purple-500",
    },
    {
        title: "Total Views",
        value: "2,543",
        change: "+12%",
        trend: "up",
        icon: Eye,
        color: "bg-blue-500",
    },
    {
        title: "New Messages",
        value: "5",
        change: "+5",
        trend: "up",
        icon: MessageSquare,
        color: "bg-orange-500",
    },
    {
        title: "Subscribers",
        value: "142",
        change: "+3%",
        trend: "up",
        icon: Users,
        color: "bg-pink-500",
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>

                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {stat.title}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                            {stat.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
