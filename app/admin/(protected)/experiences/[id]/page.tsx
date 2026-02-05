import { Metadata } from 'next';
import ExperienceForm from '@/components/forms/ExperienceForm';

export const metadata: Metadata = {
    title: 'Edit Experience | Admin',
};

export default function EditExperiencePage({ params }: { params: { id: string } }) {
    // Mock data
    const experience = {
        id: params.id,
        role: 'Robotics Engineer Intern',
        company: 'Karthikesh Robotics',
        location: 'Chennai, India',
        startDate: '2025-05-01',
        isCurrent: true,
        type: 'internship',
        description: 'Working on advanced robotics projects...',
        technologies: ['ROS2', 'Python', 'C++'],
        link: ''
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Experience</h1>
                <p className="text-gray-500 dark:text-gray-400">Update role details</p>
            </div>
            <ExperienceForm initialData={experience} />
        </div>
    );
}
