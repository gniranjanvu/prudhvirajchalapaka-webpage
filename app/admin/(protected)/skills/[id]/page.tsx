import { Metadata } from 'next';
import SkillForm from '@/components/forms/SkillForm';

export const metadata: Metadata = {
    title: 'Edit Skill | Admin',
};

export default function EditSkillPage({ params }: { params: { id: string } }) {
    const skill = {
        id: params.id,
        name: 'Python',
        category: 'programming',
        proficiency: 5,
        yearsExperience: 4,
        icon: 'python',
        isVisible: true
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Skill</h1>
                <p className="text-gray-500 dark:text-gray-400">Update skill details</p>
            </div>
            <SkillForm initialData={skill} />
        </div>
    );
}
