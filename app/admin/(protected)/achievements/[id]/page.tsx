import { Metadata } from 'next';
import AchievementForm from '@/components/forms/AchievementForm';

export const metadata: Metadata = {
    title: 'Edit Achievement | Admin',
};

export default function EditAchievementPage({ params }: { params: { id: string } }) {
    const achievement = {
        id: params.id,
        title: 'Smart India Hackathon Finalist',
        dateAchieved: '2023-11-01',
        issuer: 'Govt. of India',
        description: 'Developed an autonomous system...',
        category: 'competition',
        certificateUrl: '#'
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Achievement</h1>
                <p className="text-gray-500 dark:text-gray-400">Update details</p>
            </div>
            <AchievementForm initialData={achievement} />
        </div>
    );
}
