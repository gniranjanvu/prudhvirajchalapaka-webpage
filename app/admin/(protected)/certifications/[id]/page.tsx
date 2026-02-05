import { Metadata } from 'next';
import CertificationForm from '@/components/forms/CertificationForm';

export const metadata: Metadata = {
    title: 'Edit Certification | Admin',
};

export default function EditCertificationPage({ params }: { params: { id: string } }) {
    const cert = {
        id: params.id,
        name: 'ROS2 Developer',
        issuer: 'The Construct',
        issueDate: '2024-03-15',
        expiryDate: '',
        noExpiry: true,
        credentialId: 'ROS2-2024-123',
        credentialUrl: 'https://...',
        description: 'Advanced ROS2 programming...',
        relatedSkills: ['ROS2', 'Python', 'C++']
    };

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
