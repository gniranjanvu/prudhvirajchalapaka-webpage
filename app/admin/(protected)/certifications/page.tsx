import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash, Award, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Certifications | Admin',
};

// Mock data
const certifications = [
    { id: 1, name: 'ROS2 Developer Certification', issuer: 'The Construct', date: '2024-03-15', credentialUrl: '#', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Machine Learning Specialization', issuer: 'Coursera', date: '2023-11-20', credentialUrl: '#', image: '' },
];

export default function CertificationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Certifications</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your licenses and certificates</p>
                </div>
                <Link href="/admin/certifications/new">
                    <Button variant="accent" className="gap-2">
                        <Plus size={16} /> Add Certification
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {certifications.map((cert) => (
                    <Card key={cert.id} className="group hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{cert.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-gray-900 dark:text-gray-300">{cert.issuer}</span>
                                        <span>•</span>
                                        <span>Issued: {cert.date}</span>
                                        {cert.credentialUrl && (
                                            <>
                                                <span>•</span>
                                                <a href={cert.credentialUrl} className="flex items-center gap-1 text-blue-500 hover:underline">
                                                    Verify <ExternalLink size={10} />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/admin/certifications/${cert.id}`}>
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
