import { Metadata } from 'next';
import ExperienceForm from '@/components/forms/ExperienceForm';

export const metadata: Metadata = {
    title: 'Add Experience | Admin',
};

export default function NewExperiencePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Experience</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new role to your timeline</p>
            </div>
            <ExperienceForm />
        </div>
    );
}
