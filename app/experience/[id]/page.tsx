"use client";

import { useEffect, useState, use } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Calendar, Building2, ExternalLink, Award, Play, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { format } from "date-fns";

interface Experience {
  id: string;
  role: string;
  company_name: string;
  company_logo_url?: string;
  hero_image_url?: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  employment_type?: string;
  description?: string;
  tech_stack?: string[];
  certificate_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  is_published?: boolean;
}

// Fallback experiences
const FALLBACK_EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Robotics Engineer Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Chennai, India',
    start_date: '2025-05-01',
    end_date: '2025-11-01',
    is_current: true,
    employment_type: 'internship',
    description: '<p>Working on advanced robotics projects involving ROS2, autonomous navigation, and industrial automation systems. Developing solutions for mobile robots and implementing NavStack for navigation.</p><ul><li>Developed autonomous navigation systems using ROS2 NavStack</li><li>Implemented SLAM algorithms for robot localization</li><li>Created simulation environments in Gazebo</li><li>Worked with LiDAR and camera sensors</li></ul>',
    tech_stack: ['ROS2', 'Python', 'C++', 'NavStack', 'Gazebo', 'SLAM'],
  },
  {
    id: '2',
    role: 'Teaching Assistantship Intern',
    company_name: "Vignan's University",
    location: 'Guntur, India',
    start_date: '2025-01-01',
    end_date: '2025-04-30',
    is_current: false,
    employment_type: 'internship',
    description: '<p>Assisted in teaching robotics and automation courses. Mentored students in ROS and embedded systems projects. Conducted lab sessions and helped with curriculum development.</p>',
    tech_stack: ['ROS', 'Arduino', 'Python', 'Teaching', 'Mentoring'],
  },
  {
    id: '3',
    role: 'ROS Intern',
    company_name: 'Karthikesh Robotics',
    location: 'Online',
    start_date: '2025-01-01',
    end_date: '2025-02-28',
    is_current: false,
    employment_type: 'internship',
    description: '<p>Focused on learning and implementing ROS concepts. Developed ROS-based applications and worked on simulation environments using Gazebo.</p>',
    tech_stack: ['ROS', 'ROS2', 'Python', 'Gazebo', 'Linux'],
  },
];

interface ExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const resolvedParams = use(params);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [allExperiences, setAllExperiences] = useState<Experience[]>(FALLBACK_EXPERIENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/experiences/${resolvedParams.id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setExperience(result.data);
        } else {
          // Fallback to static data
          const fallbackExp = FALLBACK_EXPERIENCES.find(e => e.id === resolvedParams.id);
          if (fallbackExp) {
            setExperience(fallbackExp);
          }
        }

        // Fetch all experiences for "Other Experiences" section
        const allResponse = await fetch('/api/experiences');
        const allResult = await allResponse.json();
        if (allResult.success && allResult.data && allResult.data.length > 0) {
          setAllExperiences(allResult.data.filter((e: Experience) => e.is_published !== false));
        }
      } catch (error) {
        console.log('Using fallback experience');
        const fallbackExp = FALLBACK_EXPERIENCES.find(e => e.id === resolvedParams.id);
        if (fallbackExp) {
          setExperience(fallbackExp);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </main>
    );
  }

  // Redirect to experience section if experience not found
  if (!experience) {
    redirect("/#experience");
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM yyyy');
    } catch {
      return dateString;
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const otherExperiences = allExperiences.filter(exp => exp.id !== resolvedParams.id);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link href="/#experience">
            <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              Back to Experience
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section with Image */}
        {experience.hero_image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative h-64 md:h-96 rounded-3xl overflow-hidden"
          >
            <Image
              src={experience.hero_image_url}
              alt={`${experience.company_name} - ${experience.role}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        )}

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {experience.is_current && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full border border-green-500/20">
                    Current Role
                  </span>
                )}
                {experience.employment_type && (
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20 capitalize">
                    {experience.employment_type.replace(/-/g, ' ')}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                {experience.role}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  <span className="text-lg font-medium">{experience.company_name}</span>
                </div>
                {experience.location && (
                  <>
                    <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>{experience.location}</span>
                    </div>
                  </>
                )}
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span>{formatDate(experience.start_date)} - {experience.is_current ? 'Present' : experience.end_date ? formatDate(experience.end_date) : 'N/A'}</span>
                </div>
              </div>
            </div>
            
            {/* Company Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              {experience.company_logo_url ? (
                <Image
                  src={experience.company_logo_url}
                  alt={experience.company_name}
                  width={64}
                  height={64}
                  className="rounded-xl"
                />
              ) : (
                <Briefcase className="w-12 h-12 text-white" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Description */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-2xl font-bold font-display mb-6">About This Role</h2>
              {experience.description ? (
                <div 
                  className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: experience.description }}
                />
              ) : (
                <p className="text-gray-500 italic">No description available.</p>
              )}
            </div>

            {/* Gallery Section */}
            {experience.gallery_urls && experience.gallery_urls.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-accent" />
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {experience.gallery_urls.map((url, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedImage(url)}
                    >
                      <Image
                        src={url}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Section */}
            {experience.video_urls && experience.video_urls.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                  <Play className="w-6 h-6 text-accent" />
                  Videos
                </h2>
                <div className="grid gap-6">
                  {experience.video_urls.filter(url => url).map((url, index) => (
                    <div key={index} className="aspect-video rounded-xl overflow-hidden">
                      <iframe
                        src={getYoutubeEmbedUrl(url)}
                        title={`Video ${index + 1}`}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Technologies Card */}
            {experience.tech_stack && experience.tech_stack.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-bold font-display mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Info Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold font-display mb-4">Quick Info</h3>
              <div className="space-y-3">
                {experience.employment_type && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                    <span className="text-gray-500 dark:text-gray-400">Type</span>
                    <span className="font-medium capitalize">{experience.employment_type.replace(/-/g, ' ')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="font-medium">
                    {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : experience.end_date ? formatDate(experience.end_date) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className={`font-medium ${experience.is_current ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}`}>
                    {experience.is_current ? 'Active' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            {experience.certificate_url && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Certificate
                </h3>
                <a
                  href={experience.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  View Certificate
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Other Experiences Section */}
        {otherExperiences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold font-display mb-6">Other Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experience/${exp.id}`}
                  className="group bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-accent group-hover:to-purple-600 transition-all duration-300">
                      <Briefcase className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                    </div>
                    {exp.is_current && (
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold font-display mb-2 group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{exp.company_name}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs">
                    {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
