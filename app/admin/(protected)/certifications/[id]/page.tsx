'use client';

import { useEffect, useState, use } from 'react';
import CertificationForm from '@/components/forms/CertificationForm';
import { Loader2 } from 'lucide-react';

interface EditCertificationPageProps {
    params: Promise<{ id: string }>;
}

export default function EditCertificationPage({ params }: EditCertificationPageProps) {
    const resolvedParams = use(params);
    const [cert, setCert] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCert = async () => {
            try {
                const response = await fetch(`/api/certifications/${resolvedParams.id}`);
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Failed to fetch certification');
                const c = result.data;
                setCert({
                    id: c.id,
                    name: c.name,
                    issuer: c.issuer,
                    issueDate: c.issue_date || '',
                    expiryDate: c.expiry_date || '',
                    noExpiry: c.no_expiry || false,
                    credentialId: c.credential_id || '',
                    credentialUrl: c.credential_url || '',
                    certificateFile: c.certificate_file_url || '',
                    description: c.description || '',
                    relatedSkills: c.related_skills || [],
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load certification');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCert();
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Certification</h1>
                <p className="text-gray-500 dark:text-gray-400">Update credential details</p>
            </div>
            <CertificationForm initialData={cert} />
        </div>
    );
}
