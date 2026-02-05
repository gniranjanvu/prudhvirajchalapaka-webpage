import { Metadata } from 'next';
import PublicationForm from '@/components/forms/PublicationForm';

export const metadata: Metadata = {
    title: 'Add Publication | Admin',
};

export default function NewPublicationPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Publication</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new research paper</p>
            </div>
            <PublicationForm />
        </div>
    );
}
