"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Heart, MessageCircle, Eye, Star, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

interface Project {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  tech_stack?: string[];
  hero_image_url?: string;
  is_featured?: boolean;
  status?: string;
  views_count?: number;
  likes_count?: number;
  created_at?: string;
  development_date?: string;
  category?: string;
}

type SortOption = "latest" | "popular" | "name";

export default function AllProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<SortOption>("latest");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/projects?status=published');
                const result = await response.json();
                if (!response.ok || !result.success) {
                    throw new Error(result.error || 'Failed to fetch projects');
                }
                setProjects(result.data || []);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load projects');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const allCategories = useMemo(() => {
        const cats = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
        return ["All", ...cats];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        let result = [...projects];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(project =>
                project.title.toLowerCase().includes(query) ||
                (project.short_description || '').toLowerCase().includes(query) ||
                (project.tech_stack || []).some(tech => tech.toLowerCase().includes(query))
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(project => project.category === selectedCategory);
        }

        switch (sortBy) {
            case "latest":
                result.sort((a, b) => new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime());
                break;
            case "popular":
                result.sort((a, b) => (b.views_count ?? 0) - (a.views_count ?? 0));
                break;
            case "name":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return result;
    }, [projects, searchQuery, selectedCategory, sortBy]);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
                        ALL PROJECTS
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore my work in robotics, automation, and software development
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-8 border border-gray-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowSortDropdown(false); }}
                                className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white min-w-[160px] justify-between hover:border-accent transition-colors"
                            >
                                <span>{selectedCategory === "All" ? "All Categories" : selectedCategory}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-20 overflow-hidden">
                                    {allCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => { setSelectedCategory(category as string); setShowCategoryDropdown(false); }}
                                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors ${selectedCategory === category ? 'bg-accent/10 text-accent' : ''}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowCategoryDropdown(false); }}
                                className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white min-w-[140px] justify-between hover:border-accent transition-colors"
                            >
                                <span>Sort: {sortBy === "latest" ? "Latest" : sortBy === "popular" ? "Popular" : "Name"}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {showSortDropdown && (
                                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-20 overflow-hidden">
                                    {[{ value: "latest", label: "Latest" }, { value: "popular", label: "Popular" }, { value: "name", label: "Name" }].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => { setSortBy(option.value as SortOption); setShowSortDropdown(false); }}
                                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors ${sortBy === option.value ? 'bg-accent/10 text-accent' : ''}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading / Error states */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-accent" />
                    </div>
                )}

                {error && !isLoading && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 mb-8">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {allCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category as string)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-accent text-white'
                                        : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-lg">No projects found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-lg"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
                                            {project.hero_image_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={project.hero_image_url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20" />
                                            )}
                                            {project.is_featured && (
                                                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-yellow-500/90 text-yellow-900 text-xs font-bold rounded-full">
                                                    <Star className="w-3 h-3" fill="currentColor" />
                                                    FEATURED
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            {project.category && (
                                                <div className="text-xs font-mono text-accent mb-2 uppercase">
                                                    {project.category}
                                                </div>
                                            )}
                                            <h3 className="text-xl font-bold font-display mb-2 group-hover:text-accent transition-colors">
                                                {project.title}
                                            </h3>
                                            {project.short_description && (
                                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                                    {project.short_description}
                                                </p>
                                            )}

                                            {/* Technologies */}
                                            {project.tech_stack && project.tech_stack.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tech_stack.slice(0, 4).map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs rounded font-mono"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.tech_stack.length > 4 && (
                                                        <span className="px-2 py-1 text-gray-500 text-xs">
                                                            +{project.tech_stack.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Stats */}
                                            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-500 text-sm mb-4">
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-4 h-4" />
                                                    {project.likes_count ?? 0}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    {project.views_count ?? 0}
                                                </span>
                                            </div>

                                            {/* View Project Link */}
                                            <Link
                                                href={`/projects/${project.slug}`}
                                                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium"
                                            >
                                                View Project
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Results count */}
                        <div className="text-center text-gray-500 dark:text-gray-400 mb-12">
                            Showing {filteredProjects.length} of {projects.length} projects
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </main>
    );
}
