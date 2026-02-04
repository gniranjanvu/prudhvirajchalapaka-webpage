import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const experiences = [
  {
    id: 1,
    role: 'Robotics Engineer Intern',
    company: 'Karthikesh Robotics',
    location: 'Chennai, India',
    period: 'May 2025 - Nov 2025',
    description:
      'Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems.',
    technologies: ['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo'],
  },
  {
    id: 2,
    role: 'Teaching Assistantship Intern',
    company: 'Vignan\'s University',
    location: 'Guntur, India',
    period: 'Jan 2025 - Apr 2025',
    description:
      'Assisted in teaching robotics and automation courses, mentored students in ROS and embedded systems projects.',
    technologies: ['ROS', 'Arduino', 'Python', 'Teaching'],
  },
  {
    id: 3,
    role: 'ROS Intern',
    company: 'Karthikesh Robotics',
    location: 'Online',
    period: 'Jan 2025 - Feb 2025',
    description:
      'Focused on learning and implementing ROS concepts and developing ROS-based applications.',
    technologies: ['ROS', 'ROS2', 'Python', 'Gazebo'],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional journey in robotics and automation
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {exp.company} • {exp.location}
                    </CardDescription>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
