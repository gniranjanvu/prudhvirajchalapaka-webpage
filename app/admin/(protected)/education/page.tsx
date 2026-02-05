import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Education | Admin',
};

// Mock data
const education = [
    { id: 1, degree: 'Bachelor of Technology', major: 'ECE', institution: "Vignan's University", location: 'Guntur, India', startDate: '2021', endDate: '2025', isCurrent: true, grade: '8.5/10' },
    { id: 2, degree: 'Intermediate', major: 'MPC', institution: 'Narayana Jr College', location: 'Guntur, India', startDate: '2019', endDate: '2021', isCurrent: false, grade: '95%' },
];

export default function EducationPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Education</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your academic background</p>
                </div>
                <Link href="/admin/education/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Education
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {education.map((edu) => (
                    <Card key={edu.id} className="group hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                                    <GraduationCap size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">{edu.degree}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 font-medium">
                                            {edu.grade}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-900 dark:text-gray-300">{edu.institution}</span>
                                        <span>•</span>
                                        <span>{edu.major}</span>
                                        <span>•</span>
                                        <span>{edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/education/${edu.id}`}>
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
