import { Metadata } from 'next';
import ProjectForm from '@/components/forms/ProjectForm';

export const metadata: Metadata = {
    title: 'Edit Project | Admin',
};

// Mock fetch function (simulate Server Action or DB fetch)
async function getProject(id: string) {
    // In a real app, this would be:
    // const supabase = createClient();
    // const { data } = await supabase.from('projects').select('*').eq('id', id).single();
    // return data;

    return {
        id,
        title: 'Autonomous Mobile Robot',
        slug: 'autonomous-mobile-robot',
        category: 'Robotics',
        description: 'Developed an autonomous mobile robot using ROS2 with SLAM...',
        content: '<p>Detailed description here regarding the AMR project...</p>',
        technologies: ['ROS2', 'Python', 'NavStack'],
        images: ['https://via.placeholder.com/800x400'],
        githubUrl: 'https://github.com/prudhvirajchalapaka/amr',
        featured: true,
        status: 'published',
        startDate: '2024-01-01',
        endDate: '2024-06-01'
    };
}

interface EditProjectPageProps {
    params: {
        id: string;
    };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const project = await getProject(params.id);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold font-display">Edit Project</h1>
                <p className="text-gray-500 dark:text-gray-400">Update project details</p>
            </div>
            <ProjectForm initialData={project} />
        </div>
    );
}
