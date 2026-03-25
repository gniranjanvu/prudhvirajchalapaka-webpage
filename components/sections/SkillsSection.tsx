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
  hero_image_url?: string;
  skill_categories?: { id: string; name: string };
}

interface SkillProps {
  category: string;
  name: string;
  rating: number;
  hero_image_url?: string;
}

const FALLBACK_SKILLS: SkillProps[] = [
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
  const [allSkills, setAllSkills] = useState<SkillProps[]>(FALLBACK_SKILLS);
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
            hero_image_url: s.hero_image_url,
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">

          {/* Sticky Sidebar for Categories */}
          <div className="lg:w-1/3 xl:w-1/4 shrink-0 z-20">
            <div className="sticky top-32 flex flex-col gap-6 bg-white/60 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gray-900 dark:text-white leading-tight">Technical Arsenal</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                  Core tools, languages, and frameworks I utilize to architect robotics systems and software.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border backdrop-blur-md",
                        activeCategory === cat
                          ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-blue-400/50 hover:text-blue-600 dark:hover:text-blue-400"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Gallery Grid for Skills */}
          <div className="lg:w-2/3 xl:w-3/4 z-10 lg:pt-0 pb-10">
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
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
                      className="group relative p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px]"
                    >
                      {skill.hero_image_url ? (
                        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-500">
                          <Image src={skill.hero_image_url} alt={skill.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      )}

                      <div className="relative z-10 flex flex-col items-center text-center w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 relative rounded-2xl sm:rounded-[1.2rem] bg-white dark:bg-black/40 p-2 sm:p-3 flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-blue-500/40 transition-all duration-500 shadow-sm">
                          {iconUrl ? (
                            <>
                              <img
                                src={iconUrl}
                                alt={skill.name}
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain dark:invert transition-all"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <span className="hidden text-base sm:text-lg font-bold text-blue-500">{skill.name[0]}</span>
                            </>
                          ) : (
                            <span className="text-base sm:text-lg font-bold text-blue-500">{skill.name[0]}</span>
                          )}
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-display leading-tight">{skill.name}</h3>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 font-mono uppercase tracking-widest line-clamp-1">{skill.category}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
