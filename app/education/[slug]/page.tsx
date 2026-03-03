"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { EDUCATION } from "@/lib/constants";

interface Education {
  id: string | number;
  slug?: string;
  degree: string;
  field?: string;
  major?: string;
  institution?: string;
  institution_name?: string;
  location: string;
  startDate?: string;
  endDate?: string;
  start_year?: string | number;
  end_year?: string | number;
  isCurrent?: boolean;
  is_current?: boolean;
  grade: string;
  description?: string;
  highlights?: string[];
}

const FALLBACK_EDUCATION: Education[] = EDUCATION.map((e) => ({
  ...e,
  id: String(e.id),
  slug: (e.institution || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
}));

export default function EducationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [education, setEducation] = useState<Education | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const res = await fetch(`/api/education`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const found = json.data.find(
              (e: Education) =>
                e.slug === slug || String(e.id) === slug
            );
            if (found) {
              setEducation(found);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch {}
      // Fallback
      const fallback = FALLBACK_EDUCATION.find(
        (e) => e.slug === slug || String(e.id) === slug
      ) || null;
      setEducation(fallback);
      setIsLoading(false);
    }
    fetchEducation();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!education) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Education record not found</h1>
        <Link href="/#education">
          <Button variant="outline">Back to Education</Button>
        </Link>
      </div>
    );
  }

  const institutionName = education.institution_name || education.institution || "";
  const major = education.major || education.field || "";
  const startYear = education.start_year || education.startDate || "";
  const endYear = education.end_year || education.endDate || "";
  const isCurrent = education.is_current ?? education.isCurrent;
  const highlights = education.highlights || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/#education"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Education
        </Link>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-4">
              <GraduationCap className="w-3 h-3" />
              Education
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-2">
              {education.degree}
            </h1>
            {major && (
              <p className="text-xl text-purple-400 font-medium mb-4">{major}</p>
            )}
            <h2 className="text-2xl text-gray-200 mb-4">{institutionName}</h2>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-gray-400">
            {education.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {education.location}
              </span>
            )}
            {(startYear || endYear) && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {String(startYear)} – {isCurrent ? "Present" : String(endYear)}
              </span>
            )}
            {education.grade && (
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400">{education.grade}</span>
              </span>
            )}
          </div>

          {/* Description */}
          {education.description && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">{education.description}</p>
            </div>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Highlights</h3>
              <ul className="space-y-2">
                {highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
