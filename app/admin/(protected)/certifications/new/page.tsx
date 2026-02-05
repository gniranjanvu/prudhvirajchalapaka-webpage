import { Metadata } from 'next';
import CertificationForm from '@/components/forms/CertificationForm';

export const metadata: Metadata = {
    title: 'Add Certification | Admin',
};

export default function NewCertificationPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Certification</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new credential</p>
            </div>
            <CertificationForm />
        </div>
    );
}
