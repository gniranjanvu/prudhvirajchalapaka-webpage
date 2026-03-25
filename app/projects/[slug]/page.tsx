"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import {
  ArrowLeft, Github, ExternalLink, Heart, MessageCircle, Eye,
  Loader2, AlertCircle, Send, Star, Calendar, Tag
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

/* ── Scroll-triggered text reveal component ── */
function ScrollTextReveal({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start revealing when the top of the container hits 85% of the viewport.
    // Finish revealing when the bottom of the container hits 55% of the viewport (ends earlier so text is fully visible faster).
    offset: ["start 85%", "end 55%"]
  });

  const { processedHtml, totalWords } = useMemo(() => {
    let globalWordIndex = 0;
    // Split the HTML exactly by its HTML tags so we don't break the formatting
    const parts = html.split(/(<[^>]+>)/);

    const processedParts = parts.map(part => {
      // Return HTML tags entirely untouched so the browser parses them correctly
      if (part.startsWith('<') && part.endsWith('>')) {
        return part;
      }

      // It's a text node. Split it cleanly by spaces while preserving the spaces.
      const wordsAndSpaces = part.split(/(\s+)/);
      return wordsAndSpaces.map(word => {
        if (!word.trim()) return word; // Keep whitespace intact without wrapping

        const index = globalWordIndex++;
        // Use a perfectly optimized inline style to calculate this specific word's animation state purely via CSS calculation, driven by the parent's generic --scroll-progress. 
        // We add a +10 buffer to total_words and divide by 5 (tighter fade window) to guarantee the last word reaches 100% before the scroll completely finishes.
        return `<span style="--word-index: ${index}; --progress: clamp(0, (var(--scroll-progress) * (var(--total-words) + 10) - var(--word-index)) / 5, 1); opacity: calc(0.1 + 0.9 * var(--progress)); filter: blur(calc((1 - var(--progress)) * 4px)); transform: translateY(calc((1 - var(--progress)) * 6px)); display: inline-block; transition: opacity 0.1s ease-out, transform 0.1s ease-out, filter 0.1s ease-out; will-change: opacity, transform, filter;">${word}</span>`;
      }).join('');
    });

    return {
      processedHtml: processedParts.join(''),
      totalWords: globalWordIndex
    };
  }, [html]);

  const fillPct = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Common typography styles for the rich text from TipTap
  const proseClasses = "text-lg leading-[1.9] max-w-none [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-3 [&>p]:mb-6 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_*]:!text-[inherit] [&_*]:!bg-[transparent]";

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      style={{
        "--scroll-progress": scrollYProgress,
        "--total-words": totalWords
      } as any}
    >
      {/* Reading progress bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full shadow-[0_0_8px_rgba(215,25,33,0.5)]"
          style={{ width: useMotionTemplate`${fillPct}%` }}
        />
      </div>

      <div
        className={`text-gray-900 dark:text-white ${proseClasses}`}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </motion.div>
  );
}

interface Project {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  tech_stack?: string[];
  hero_image_url?: string;
  gallery_urls?: string[];
  video_urls?: string[];
  github_url?: string;
  demo_url?: string;
  documentation_url?: string;
  action_buttons?: { type: string; label: string; url: string }[];
  is_featured?: boolean;
  status?: string;
  views_count?: number;
  likes_count?: number;
  development_date?: string;
  created_at?: string;
  category?: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  parent_id?: string;
  is_admin_reply?: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState({
    author_name: "",
    author_email: "",
    content: "",
  });
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Generate a simple visitor ID stored in sessionStorage
  const getVisitorId = () => {
    if (typeof window === "undefined") return "anonymous";
    let id = sessionStorage.getItem("visitor_id");
    if (!id) {
      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem("visitor_id", id);
    }
    return id;
  };

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        setIsLoading(true);

        // Fetch all projects and do the filtering client-side for absolute safety with URL encodings
        // The API route doesn't strict-match well if there are encoding nuances, so fetch all
        const response = await fetch(`/api/projects`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Project not found");
        }

        // API returns array, find matching slug with extremely robust fallback for encoded spaces, trailing spaces, and case differences
        const targetSlug = slug.trim().toLowerCase();
        const found = Array.isArray(result.data)
          ? result.data.find((p: Project) => {
            if (!p.slug) return false;
            const pSlug = p.slug.trim().toLowerCase();
            return pSlug === targetSlug ||
              pSlug === rawSlug.toLowerCase() ||
              encodeURIComponent(p.slug).toLowerCase() === rawSlug.toLowerCase();
          })
          : null;

        if (!found) {
          throw new Error("Project not found");
        }

        setProject(found);
        setLikeCount(found.likes_count ?? 0);

        // Fetch comments
        const commentsRes = await fetch(`/api/projects/${found.id}/comments`);
        const commentsResult = await commentsRes.json();
        if (commentsResult.success) {
          setComments(commentsResult.data || []);
        }

        // Fetch likes status
        const visitorId = getVisitorId();
        const likesRes = await fetch(
          `/api/projects/${found.id}/likes?visitor_id=${encodeURIComponent(visitorId)}`
        );
        const likesResult = await likesRes.json();
        if (likesResult.success) {
          setLikeCount(likesResult.data.count);
          setHasLiked(likesResult.data.liked);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const handleLike = async () => {
    if (!project) return;
    const visitorId = getVisitorId();
    try {
      const res = await fetch(`/api/projects/${project.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitor_id: visitorId }),
      });
      const result = await res.json();
      if (result.success) {
        setHasLiked(result.liked);
        setLikeCount((prev) => result.liked ? prev + 1 : prev - 1);
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentForm),
      });
      const result = await res.json();
      if (result.success) {
        setCommentSuccess(true);
        setCommentForm({ author_name: "", author_email: "", content: "" });
        setTimeout(() => setCommentSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#0e0e0e] dark:to-[#0a0a0a] text-gray-900 dark:text-white pt-24">
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-gray-500 mb-6">{error || "This project does not exist."}</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0ebe5] via-[#ede7e0] to-[#e8e0d8] dark:from-[#0a0a0a] dark:via-[#0e0e0e] dark:to-[#0a0a0a] text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
        {project.hero_image_url && (
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.hero_image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.category && (
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-mono rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" /> {project.category}
              </span>
            )}
            {project.is_featured && (
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-bold rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" /> Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            {project.title}
          </h1>

          {project.short_description && (
            <p className="text-lg text-gray-300 max-w-3xl mb-6">
              {project.short_description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {project.views_count ?? 0} views
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> {likeCount} likes
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" /> {comments.length} comments
            </span>
            {project.development_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(project.development_date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/80 text-white rounded-xl transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.documentation_url && (
              <a
                href={project.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" /> Documentation
              </a>
            )}
            {/* Dynamic action buttons from DB */}
            {project.action_buttons && project.action_buttons.length > 0 && project.action_buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" /> {btn.label || btn.type}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            {project.full_description && (
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-black/10 dark:border-white/10 shadow-xl">
                <h2 className="text-xl font-bold font-display mb-4">About this project</h2>
                <ScrollTextReveal html={project.full_description} />
              </div>
            )}

            {/* Gallery */}
            {project.gallery_urls && project.gallery_urls.length > 0 && (
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-black/10 dark:border-white/10 shadow-xl">
                <h2 className="text-xl font-bold font-display mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery_urls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {project.video_urls && project.video_urls.length > 0 && (
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-black/10 dark:border-white/10 shadow-xl">
                <h2 className="text-xl font-bold font-display mb-4">Videos</h2>
                <div className="space-y-4">
                  {project.video_urls.map((url, i) => {
                    // Check if it's a direct HTML5 video link
                    const isHTML5Video = url.match(/\.(mp4|webm|ogg)$/i) || url.includes('.mp4?');

                    if (isHTML5Video) {
                      return (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-black/5 dark:bg-black/20">
                          <video
                            src={url}
                            controls
                            className="w-full h-full object-contain"
                            preload="metadata"
                          />
                        </div>
                      );
                    }

                    // Otherwise try to create an embed URL
                    let embedUrl = url;
                    try {
                      // Attempt to parse out known platforms. If unknown, we still render the iframe as fallback.
                      const urlObj = new URL(url);
                      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
                        const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').filter(Boolean).pop();
                        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                      } else if (urlObj.hostname.includes('vimeo.com')) {
                        const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
                        if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
                      } else if (urlObj.hostname.includes('loom.com')) {
                        embedUrl = url.replace('/share/', '/embed/');
                      }
                    } catch (e) {
                      // Do nothing, just use original url
                    }

                    return (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={embedUrl}
                          title={`Video ${i + 1}`}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-black/10 dark:border-white/10 shadow-xl">
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                Comments ({comments.length})
              </h2>

              {/* Existing Comments */}
              {comments.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {comments.filter(c => !c.parent_id).map((comment) => {
                    const replies = comments.filter(c => c.parent_id === comment.id);
                    return (
                      <div key={comment.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm">{comment.author_name}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
                        </motion.div>
                        {/* Admin replies */}
                        {replies.length > 0 && (
                          <div className="ml-8 mt-2 space-y-2">
                            {replies.map((reply) => (
                              <motion.div
                                key={reply.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-accent/5 dark:bg-accent/10 rounded-xl border-l-2 border-accent"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">{reply.author_name}</span>
                                    {reply.is_admin_reply && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-bold uppercase">Admin</span>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.created_at).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}

              {/* Comment Form */}
              {commentSuccess ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-sm">
                  ✓ Your comment has been submitted and is awaiting approval. Thank you!
                </div>
              ) : (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">
                    Leave a Comment
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name *"
                      required
                      value={commentForm.author_name}
                      onChange={(e) =>
                        setCommentForm((prev) => ({ ...prev, author_name: e.target.value }))
                      }
                      className="px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                    <input
                      type="email"
                      placeholder="Your email *"
                      required
                      value={commentForm.author_email}
                      onChange={(e) =>
                        setCommentForm((prev) => ({ ...prev, author_email: e.target.value }))
                      }
                      className="px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <textarea
                    placeholder="Your comment *"
                    required
                    rows={4}
                    value={commentForm.content}
                    onChange={(e) =>
                      setCommentForm((prev) => ({ ...prev, content: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingComment}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/80 disabled:opacity-50 text-white rounded-xl transition-colors font-medium text-sm"
                  >
                    {isSubmittingComment ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit Comment
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-xl">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-gray-500">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Like Button */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-xl text-center">
              <button
                onClick={handleLike}
                className={`inline-flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all ${hasLiked
                  ? "bg-red-50 dark:bg-red-900/20 text-red-500 border-2 border-red-200 dark:border-red-800"
                  : "bg-gray-50 dark:bg-zinc-800 text-gray-500 border-2 border-gray-200 dark:border-zinc-700 hover:border-red-200 hover:text-red-500"
                  }`}
              >
                <Heart
                  className="w-8 h-8"
                  fill={hasLiked ? "currentColor" : "none"}
                />
                <span className="font-bold text-lg">{likeCount}</span>
                <span className="text-sm">{hasLiked ? "Liked!" : "Like this project"}</span>
              </button>
            </div>

            {/* Links */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-xl">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-gray-500">
                Links
              </h3>
              <div className="space-y-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4 flex-shrink-0" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0 text-accent" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                  </a>
                )}
                {project.documentation_url && (
                  <a
                    href={project.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span>Documentation</span>
                    <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                  </a>
                )}
              </div>
            </div>

            {/* Back to Projects */}
            <Link
              href="/projects"
              className="flex items-center justify-center gap-2 p-4 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border border-black/10 dark:border-white/10 hover:border-accent/50 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Projects
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
