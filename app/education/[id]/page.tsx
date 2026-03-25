"use client";

import { useEffect, useState, use } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, MapPin, Calendar, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

interface Education {
    id: string;
    institution_name: string;
    degree: string;
    major: string;
    start_year: number;
    end_year?: number;
    is_current: boolean;
    grade?: string;
    location?: string;
    hero_image_url?: string;
    description?: string;
    key_courses?: string[];
    is_published?: boolean;
}

// Fallback education blocks
const FALLBACK_EDUCATION: Education[] = [
    {
        id: "1",
        institution_name: "Vignan's Foundation for Science, Technology and Research",
        degree: "Bachelor of Technology",
        major: "Robotics and Automation",
        start_year: 2021,
        end_year: 2025,
        is_current: true,
        grade: "8.1 CGPA",
        location: "Guntur, Andhra Pradesh",
        description: "<p>Relevant Coursework: Kinematics and Dynamics of Robots, Robot Programming, Artificial Intelligence, Control Systems, Microprocessors and Microcontrollers.</p>",
        key_courses: ["Kinematics", "Robot Programming", "AI", "Control Systems"],
    },
    {
        id: "2",
        institution_name: "Tirumala Junior College",
        degree: "Intermediate",
        major: "M.P.C (Maths, Physics, Chemistry)",
        start_year: 2019,
        end_year: 2021,
        is_current: false,
        grade: "96.4%",
        location: "Rajahmundry, Andhra Pradesh",
        description: "",
    },
    {
        id: "3",
        institution_name: "Jawahar Navodaya Vidyalaya",
        degree: "High School",
        major: "Class VI - X",
        start_year: 2014,
        end_year: 2019,
        is_current: false,
        grade: "91.2%",
        location: "Peddapuram, Andhra Pradesh",
        description: "",
    }
];

interface EducationPageProps {
    params: Promise<{ id: string }>;
}

export default function EducationPage({ params }: EducationPageProps) {
    const resolvedParams = use(params);
    const [education, setEducation] = useState<Education | null>(null);
    const [allEducation, setAllEducation] = useState<Education[]>(FALLBACK_EDUCATION);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                // Try to fetch from API first
                const response = await fetch(`/api/education/${resolvedParams.id}`);
                const result = await response.json();

                if (result.success && result.data) {
                    setEducation(result.data);
                } else {
                    // Fallback to static data
                    const fallbackEdu = FALLBACK_EDUCATION.find(e => e.id === resolvedParams.id);
                    if (fallbackEdu) {
                        setEducation(fallbackEdu);
                    }
                }

                // Fetch all education for "Other Education" section
                const allResponse = await fetch('/api/education');
                const allResult = await allResponse.json();
                if (allResult.success && allResult.data && allResult.data.length > 0) {
                    setAllEducation(allResult.data.filter((e: Education) => e.is_published !== false));
                }
            } catch (error) {
                console.log('Using fallback education');
                const fallbackEdu = FALLBACK_EDUCATION.find(e => e.id === resolvedParams.id);
                if (fallbackEdu) {
                    setEducation(fallbackEdu);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchEducation();
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading...</div>
            </main>
        );
    }

    // Redirect to education section if not found
    if (!education) {
        redirect("/#education");
    }

    const otherEducation = allEducation.filter(edu => edu.id !== resolvedParams.id);

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
                    <Link href="/#education">
                        <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Education
                        </Button>
                    </Link>
                </motion.div>

                {/* Hero Section with Image */}
                {education.hero_image_url && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 relative h-64 md:h-96 rounded-3xl overflow-hidden"
                    >
                        <Image
                            src={education.hero_image_url}
                            alt={`${education.institution_name}`}
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
                                {education.is_current && (
                                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full border border-green-500/20">
                                        Current Student
                                    </span>
                                )}
                                {education.degree && (
                                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
                                        {education.degree}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                                {education.major}
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-accent" />
                                    <span className="text-lg font-medium">{education.institution_name}</span>
                                </div>
                                {education.location && (
                                    <>
                                        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-accent" />
                                            <span>{education.location}</span>
                                        </div>
                                    </>
                                )}
                                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-accent" />
                                    <span>{education.start_year} - {education.is_current ? 'Present' : education.end_year || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Institution Icon */}
                        <div className="w-24 h-24 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                            <BookOpen className="w-12 h-12 text-white" />
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
                            <h2 className="text-2xl font-bold font-display mb-6">About This Education</h2>
                            {education.description ? (
                                <div
                                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: education.description }}
                                />
                            ) : (
                                <p className="text-gray-500 italic">No description available.</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Key Courses Card */}
                        {education.key_courses && education.key_courses.length > 0 && (
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
                                <h3 className="text-lg font-bold font-display mb-4">Key Courses</h3>
                                <div className="flex flex-wrap gap-2">
                                    {education.key_courses.map((course) => (
                                        <span
                                            key={course}
                                            className="px-3 py-1.5 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-accent/20"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Info Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800 shadow-sm">
                            <h3 className="text-lg font-bold font-display mb-4">Details</h3>
                            <div className="space-y-3">
                                {education.grade && (
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                                        <span className="text-gray-500 dark:text-gray-400">Grade</span>
                                        <span className="font-medium">{education.grade}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                                    <span className="text-gray-500 dark:text-gray-400">Duration</span>
                                    <span className="font-medium">
                                        {education.start_year} - {education.is_current ? 'Present' : education.end_year || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                                    <span className={`font-medium ${education.is_current ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {education.is_current ? 'In Progress' : 'Completed'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Other Education Section */}
                {otherEducation.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold font-display mb-6">Other Education</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherEducation.map((edu) => (
                                <Link
                                    key={edu.id}
                                    href={`/education/${edu.id}`}
                                    className="group bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-accent group-hover:to-purple-600 transition-all duration-300">
                                            <GraduationCap className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        {edu.is_current && (
                                            <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold font-display mb-2 group-hover:text-accent transition-colors">
                                        {edu.major || edu.degree}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{edu.institution_name}</p>
                                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                                        {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year || 'N/A'}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            <Footer />
        </main>
    );
}
