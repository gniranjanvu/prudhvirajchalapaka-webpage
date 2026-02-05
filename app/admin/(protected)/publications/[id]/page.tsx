import { Metadata } from 'next';
import PublicationForm from '@/components/forms/PublicationForm';

export const metadata: Metadata = {
    title: 'Edit Publication | Admin',
};

export default function EditPublicationPage({ params }: { params: { id: string } }) {
    const publication = {
        id: params.id,
        title: 'Comparative Analysis of Robotic Surgery...',
        publishedIn: 'Elsevier',
        publisher: 'Elsevier',
        date: '2024-05-01',
        url: 'https://...',
        doi: '10.1016/...',
        abstract: 'This paper explores...',
        authors: ['P. Chalapaka', 'Other Author'],
        tags: ['Robotics', 'Surgery']
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Publication</h1>
                <p className="text-gray-500 dark:text-gray-400">Update publication details</p>
            </div>
            <PublicationForm initialData={publication} />
        </div>
    );
}
