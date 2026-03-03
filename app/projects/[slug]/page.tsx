"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Github, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { PROJECTS } from "@/lib/constants";

interface Project {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies?: string[];
  tech_stack?: string[];
  category: string;
  github?: string;
  github_url?: string;
  demo?: string;
  demo_url?: string;
  hero_image_url?: string;
  image?: string;
  status?: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const FALLBACK_PROJECTS: Project[] = PROJECTS.map(p => ({
  ...p,
  id: String(p.id),
  technologies: p.technologies,
}));

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const liked = localStorage.getItem(`liked_project_${slug}`);
    setHasLiked(liked === "true");
  }, [slug]);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setProject(json.data);
            return;
          }
        }
      } catch {}
      // Fallback to constants
      const fallback = FALLBACK_PROJECTS.find(p => p.slug === slug) || null;
      setProject(fallback);
    }

    async function fetchLikes() {
      try {
        const res = await fetch(`/api/projects/${slug}/likes`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) setLikeCount(json.data.count);
        }
      } catch {}
    }

    async function fetchComments() {
      try {
        const res = await fetch(`/api/projects/${slug}/comments`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) setComments(json.data);
        }
      } catch {}
    }

    Promise.all([fetchProject(), fetchLikes(), fetchComments()]).finally(() =>
      setIsLoading(false)
    );
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      const res = await fetch(`/api/projects/${slug}/likes`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setLikeCount(json.data.count);
          setHasLiked(true);
          localStorage.setItem(`liked_project_${slug}`, "true");
        }
      }
    } catch {}
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/projects/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author_name: commentName, content: commentText }),
      });
      if (res.ok) {
        setCommentSuccess(true);
        setCommentName("");
        setCommentText("");
        setTimeout(() => setCommentSuccess(false), 3000);
      }
    } catch {}
    setIsSubmittingComment(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const techStack = project.tech_stack || project.technologies || [];
  const githubUrl = project.github_url || project.github || "";
  const demoUrl = project.demo_url || project.demo || "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30 mb-4">
            <Tag className="w-3 h-3" />
            {project.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg max-w-3xl mb-8 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="w-4 h-4" /> View on GitHub
                </Button>
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              </a>
            )}
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                hasLiked
                  ? "border-red-500/50 text-red-400 cursor-default"
                  : "border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-red-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-400" : ""}`} />
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </button>
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-400" />
              Comments
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-10 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Leave a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  required
                />
              </div>
              {commentSuccess && (
                <p className="text-green-400 text-sm">
                  Comment submitted for review. Thank you!
                </p>
              )}
              <Button
                type="submit"
                disabled={isSubmittingComment}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmittingComment ? "Submitting..." : "Post Comment"}
              </Button>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">
                        {comment.author_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
