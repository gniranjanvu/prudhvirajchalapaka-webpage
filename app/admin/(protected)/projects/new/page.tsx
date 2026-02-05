import { Metadata } from 'next';
import ProjectForm from '@/components/forms/ProjectForm';

export const metadata: Metadata = {
    title: 'New Project | Admin',
};

export default function NewProjectPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">New Project</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new project to your portfolio</p>
            </div>
            <ProjectForm />
        </div>
    );
}
