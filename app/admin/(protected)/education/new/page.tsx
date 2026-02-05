import { Metadata } from 'next';
import EducationForm from '@/components/forms/EducationForm';

export const metadata: Metadata = {
    title: 'Add Education | Admin',
};

export default function NewEducationPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Education</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new academic record</p>
            </div>
            <EducationForm />
        </div>
    );
}
