"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { ClientSideParticles } from "@/components/ui/ClientSideParticles";
import { cn } from "@/lib/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mapping for skill names to Simple Icons slugs
const iconSlugMap: Record<string, string | null> = {
  "MATLAB": null,
  "Java": "openjdk",
  "ROS": "ros",
  "ROS2": "ros",
  "YOLO": null,
  "C++": "cplusplus",
  "C": "c",
  "Python": "python",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "HTML": "html5",
  "CSS": "css3",
  "React": "react",
  "Node.js": "nodedotjs",
  "Arduino": "arduino",
  "Linux": "linux",
  "Git": "git",
  "Docker": "docker",
  "TensorFlow": "tensorflow",
  "PyTorch": "pytorch",
  "OpenCV": "opencv",
  "Raspberry Pi": "raspberrypi",
  "MongoDB": "mongodb",
  "PostgreSQL": "postgresql",
  "Firebase": "firebase",
  "AWS": "amazonaws",
  "Figma": "figma",
  "Blender": "blender",
  "SolidWorks": null,
  "solidworks": null,
  "AutoCAD": null,
  "autocad": null,
  "Fusion 360": null,
  "fusion360": null,
  "VS Code": "visualstudiocode",
  "vscode": "visualstudiocode",
  "RViz": null,
  "rviz": null,
  "Jupyter Notebook": "jupyter",
  "jupyternotebook": "jupyter",
  "IoT": null,
  "iot": null,
  "Next.js": "nextdotjs",
  "nextjs": "nextdotjs",
};

// Helper to get icon URL
function getIconUrl(name: string): string | null {
  const slug = iconSlugMap[name];
  if (slug === null) return null;
  if (slug) return `https://cdn.simpleicons.org/${slug}`;

  const lower = name.toLowerCase().replace(/[\s.]/g, '');
  if (iconSlugMap[lower] === null) return null;
  if (iconSlugMap[lower]) return `https://cdn.simpleicons.org/${iconSlugMap[lower]}`;

  return `https://cdn.simpleicons.org/${lower}`;
}

interface DBSkill {
  id: string;
  name: string;
  proficiency: number;
  skill_categories?: { id: string; name: string };
}

const FALLBACK_SKILLS = [
  { category: "Programming Languages", name: "Python", rating: 5 },
  { category: "Programming Languages", name: "C", rating: 5 },
  { category: "Programming Languages", name: "C++", rating: 4 },
  { category: "Programming Languages", name: "Java", rating: 3 },
  { category: "Programming Languages", name: "MATLAB", rating: 4 },
  { category: "Frameworks", name: "ROS", rating: 5 },
  { category: "Frameworks", name: "ROS2", rating: 5 },
  { category: "Frameworks", name: "OpenCV", rating: 5 },
  { category: "Frameworks", name: "TensorFlow", rating: 4 },
  { category: "Frameworks", name: "PyTorch", rating: 4 },
  { category: "Frameworks", name: "YOLO", rating: 4 },
  { category: "Technologies", name: "Linux", rating: 5 },
  { category: "Technologies", name: "Git", rating: 5 },
  { category: "Technologies", name: "Docker", rating: 4 },
  { category: "Technologies", name: "Arduino", rating: 5 },
  { category: "Technologies", name: "Raspberry Pi", rating: 5 },
  { category: "Technologies", name: "SolidWorks", rating: 4 },
  { category: "Technologies", name: "3D Printing", rating: 5 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
          )}
        />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [allSkills, setAllSkills] = useState(FALLBACK_SKILLS);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const mapped = result.data.map((s: DBSkill) => ({
            category: s.skill_categories?.name || 'Other',
            name: s.name,
            rating: s.proficiency || 3,
          }));
          setAllSkills(mapped);
        }
      } catch {
        console.log('Using fallback skills');
      }
    };
    fetchSkills();
  }, []);

  const categories = ["All", ...Array.from(new Set(allSkills.map((s) => s.category)))];

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  // CRITICAL: When the filtered skills change, the height of the container changes.
  // We MUST tell GSAP ScrollTrigger to recalculate its positions after the framer-motion layout animation completes.
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600); // Wait for the 500ms stagger/layout animations to completely finish
    return () => clearTimeout(timer);
  }, [filteredSkills]);

  return (
    <section id="skills" className="py-20 relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-[#ede7e0] via-[#f0ebe5] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#111111] dark:to-[#0a0a0a]" style={{ zIndex: 2 }}>
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <ClientSideParticles />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-20">

        {/* GRAND GLASSMORPHISM CONTAINER */}
        <div className="w-full bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative group overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-4 text-gray-900 dark:text-white">Technical Arsenal</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tools and technologies I utilize to bring robotics systems to life.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md",
                  activeCategory === cat
                    ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30 shadow-lg shadow-blue-500/15 dark:shadow-blue-500/25"
                    : "bg-white/40 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const iconUrl = getIconUrl(skill.name);
                return (
                  <motion.div
                    layout
                    key={skill.name}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative p-8 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-20 h-20 mb-6 relative rounded-[1.5rem] bg-white/60 dark:bg-black/40 p-4 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-blue-500/30 transition-all duration-500 shadow-inner">
                        {iconUrl ? (
                          <>
                            <img
                              src={iconUrl}
                              alt={skill.name}
                              className="w-10 h-10 object-contain dark:invert transition-all"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <span className="hidden text-xl font-bold text-blue-500">{skill.name[0]}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-blue-500">{skill.name[0]}</span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-display">{skill.name}</h3>
                      <StarRating rating={skill.rating} />
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-mono uppercase tracking-widest">{skill.category}</span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
