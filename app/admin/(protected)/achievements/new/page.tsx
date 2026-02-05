import { Metadata } from 'next';
import AchievementForm from '@/components/forms/AchievementForm';

export const metadata: Metadata = {
    title: 'Add Achievement | Admin',
};

export default function NewAchievementPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Add Achievement</h1>
                <p className="text-gray-500 dark:text-gray-400">Add a new award or milestone</p>
            </div>
            <AchievementForm />
        </div>
    );
}
