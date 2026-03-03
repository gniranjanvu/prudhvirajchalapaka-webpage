'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Trash, Award, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Certification {
    id: string;
    name: string;
    issuer: string;
    issue_date: string;
    credential_url?: string;
    is_published: boolean;
}

export default function CertificationsPage() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchCertifications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/certifications');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch certifications');
            }

            setCertifications(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching certifications:', err);
            setError(err instanceof Error ? err.message : 'Failed to load certifications');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certification?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/certifications/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete certification');
            }

            toast({
                title: "Certification Deleted",
                description: "The certification has been removed successfully.",
                type: "success"
            });

            fetchCertifications();
        } catch (err) {
            console.error('Error deleting certification:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete certification.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

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

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchCertifications}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {certifications.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Award className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No certifications yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Add your first certification to get started
                        </p>
                        <Link href="/admin/certifications/new">
                            <Button variant="accent">Add Certification</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {certifications.map((cert) => (
                        <Card key={cert.id} className="group hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{cert.name}</h3>
                                            {!cert.is_published && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-medium text-gray-900 dark:text-gray-300">{cert.issuer}</span>
                                            <span>•</span>
                                            <span>Issued: {cert.issue_date}</span>
                                            {cert.credential_url && (
                                                <>
                                                    <span>•</span>
                                                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline">
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
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => handleDelete(cert.id)}
                                        disabled={deletingId === cert.id}
                                    >
                                        {deletingId === cert.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash size={16} />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
