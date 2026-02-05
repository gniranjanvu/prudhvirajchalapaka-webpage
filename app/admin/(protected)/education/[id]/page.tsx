import { Metadata } from 'next';
import EducationForm from '@/components/forms/EducationForm';

export const metadata: Metadata = {
    title: 'Edit Education | Admin',
};

export default function EditEducationPage({ params }: { params: { id: string } }) {
    const education = {
        id: params.id,
        degree: 'Bachelor of Technology',
        major: 'Electronics & Communication',
        institution: "Vignan's University",
        location: 'Guntur, India',
        startDate: '2021',
        endDate: '2025',
        isCurrent: true,
        grade: '8.5/10',
        description: 'Specializing in Robotics...',
        keyCourses: ['Robotics', 'Embedded Systems']
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Education</h1>
                <p className="text-gray-500 dark:text-gray-400">Update academic details</p>
            </div>
            <EducationForm initialData={education} />
        </div>
    );
}
