import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Experience | Admin',
};

// Mock data
const experiences = [
    { id: 1, role: 'Robotics Engineer Intern', company: 'Karthikesh Robotics', type: 'internship', location: 'Chennai, India', startDate: '2025-05-01', isCurrent: true },
    { id: 2, role: 'Teaching Assistant', company: "Vignan's University", type: 'internship', location: 'Guntur, India', startDate: '2025-01-01', endDate: '2025-04-30', isCurrent: false },
];

export default function ExperiencePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Experience</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your work history</p>
                </div>
                <Link href="/admin/experiences/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Experience
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp) => (
                    <Card key={exp.id} className="group hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-900 dark:text-gray-300">{exp.company}</span>
                                        <span>•</span>
                                        <span className="capitalize">{exp.type}</span>
                                        <span>•</span>
                                        <span>{exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/experiences/${exp.id}`}>
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
