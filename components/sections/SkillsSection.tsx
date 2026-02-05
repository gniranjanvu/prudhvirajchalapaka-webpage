"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { ClientSideParticles } from "@/components/ui/ClientSideParticles";
import { cn } from "@/lib/utils/cn";

// Mapping for skill names to Simple Icons slugs
// Some icons don't exist on Simple Icons or have different slugs
const iconSlugMap: Record<string, string | null> = {
  "MATLAB": null, // Not available on Simple Icons
  "Java": "openjdk",
  "ROS": "ros",
  "ROS2": "ros", // ROS2 uses same icon as ROS
  "YOLO": null, // Not available on Simple Icons
  "STM32": "stmicroelectronics",
  "Jetson Nano": "nvidia",
  "Gazebo": null, // Not available on Simple Icons
  "SolidWorks": "dassaultsystemes",
  "Fusion 360": "autodesk",
  "3D Printing": null, // Not available on Simple Icons
  "Raspberry Pi": "raspberrypi",
  "C++": "cplusplus",
};

// Helper to get icon URL
const getIconUrl = (name: string): string | null => {
  // Check if we have a specific mapping for this skill
  if (name in iconSlugMap) {
    const slug = iconSlugMap[name];
    if (slug === null) {
      return null; // No icon available
    }
    return `https://cdn.simpleicons.org/${slug}`;
  }
  
  // Default slug generation for skills not in the map
  const slug = name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "").replace(/\+/g, "plus");
  return `https://cdn.simpleicons.org/${slug}`;
};

const allSkills = [
  { category: "Programming Languages", name: "Python", rating: 5 },
  { category: "Programming Languages", name: "C", rating: 5 },
  { category: "Programming Languages", name: "C++", rating: 4 },
  { category: "Programming Languages", name: "MATLAB", rating: 4 },
  { category: "Programming Languages", name: "Java", rating: 2 },
  { category: "Frameworks & Libraries", name: "ROS", rating: 5 },
  { category: "Frameworks & Libraries", name: "ROS2", rating: 5 },
  { category: "Frameworks & Libraries", name: "YOLO", rating: 4 },
  { category: "Frameworks & Libraries", name: "TensorFlow", rating: 3 },
  { category: "Frameworks & Libraries", name: "Arduino", rating: 5 },
  { category: "Hardware & Boards", name: "Raspberry Pi", rating: 4 },
  { category: "Hardware & Boards", name: "STM32", rating: 3 },
  { category: "Hardware & Boards", name: "Jetson Nano", rating: 4 },
  { category: "Tools & Software", name: "Git", rating: 4 },
  { category: "Tools & Software", name: "Linux", rating: 5 },
  { category: "Tools & Software", name: "Gazebo", rating: 5 },
  { category: "CAD/CAM", name: "SolidWorks", rating: 4 },
  { category: "CAD/CAM", name: "Fusion 360", rating: 5 },
  { category: "Technologies", name: "3D Printing", rating: 5 },
];

const categories = ["All", ...Array.from(new Set(allSkills.map((s) => s.category)))];

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.1, duration: 0.2 }}
        >
          <Star
            className={`w-3 h-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-700"
              }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-dot-pattern relative overflow-hidden transition-colors duration-300">

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <ClientSideParticles />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
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
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-black/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-blue-500/50 hover:text-blue-500"
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
                className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 relative rounded-xl bg-gray-50 dark:bg-black p-3 flex items-center justify-center border border-gray-100 dark:border-white/5 group-hover:border-blue-500/20 transition-colors">
                    {/* Show icon if available, fallback to text */}
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

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                  <StarRating rating={skill.rating} />
                  <span className="text-xs text-gray-400 mt-2">{skill.category}</span>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
