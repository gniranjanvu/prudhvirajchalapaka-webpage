import { Metadata } from 'next';
import SkillForm from '@/components/forms/SkillForm';

export const metadata: Metadata = {
    title: 'Add Skill | Admin',
};

export default function NewSkillPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Skill</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new technical skill</p>
            </div>
            <SkillForm />
        </div>
    );
}
