"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { OWNER_INFO, SOCIAL_LINKS } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Check,
  Send,
  RotateCcw,
  XCircle,
  Minus,
  Square,
  X,
} from "lucide-react";

// ─── Terminal Contact Form ───────────────────────────────────────────────────

interface HistoryEntry {
  type: "message" | "success-log" | "error-log";
  content?: string;
  hasSeparator?: boolean;
  prompt?: string;
  value?: string;
  error?: string;
}

interface StepConfig {
  key: string;
  type: "message" | "input";
  content?: string;
  hasSeparator?: boolean;
  prompt?: string;
  placeholder?: string;
  validate?: (val: string) => string | null;
}

function TerminalContactForm() {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [formData, setFormData] = useState({ email: "", name: "", message: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const steps: StepConfig[] = [
    {
      key: "intro",
      type: "message",
      content: "Hey there! We're excited to link 🔗",
      hasSeparator: true,
    },
    {
      key: "email",
      type: "input",
      prompt: "To start, could you give us your email?",
      placeholder: "Enter email:",
      validate: (val: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val) ? null : "Error: Invalid email format. Please try again.";
      },
    },
    {
      key: "name",
      type: "input",
      prompt: "Awesome! And what's your name?",
      placeholder: "Enter name:",
      validate: (val: string) =>
        val.trim().length > 0 ? null : "Error: Name cannot be empty.",
    },
    {
      key: "message",
      type: "input",
      prompt: "Perfect, and how can we help you?",
      placeholder: "Enter description:",
      validate: (val: string) =>
        val.trim().length > 0 ? null : "Error: Message cannot be empty.",
    },
  ];

  // Scroll within the terminal container only (no page scroll)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history, step, error]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [history, step, error]);

  // Initialize with intro message
  useEffect(() => {
    setHistory([
      {
        type: "message",
        content: steps[0].content,
        hasSeparator: true,
      },
    ]);
    setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentStepIndex = () => step;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      const currentStepObj = steps[getCurrentStepIndex()];
      if (!currentStepObj) return;

      const validationError = currentStepObj.validate
        ? currentStepObj.validate(inputValue)
        : null;

      if (validationError) {
        setError(validationError);
        setHistory((prev) => [
          ...prev,
          {
            type: "error-log",
            prompt: currentStepObj.placeholder,
            value: inputValue,
            error: validationError,
          },
        ]);
        setInputValue("");
        return;
      }

      setFormData((prev) => ({ ...prev, [currentStepObj.key]: inputValue }));
      setHistory((prev) => [
        ...prev,
        {
          type: "success-log",
          prompt: currentStepObj.prompt,
          value: inputValue,
        },
      ]);
      setInputValue("");
      setStep((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setHistory([]);
    setFormData({ email: "", name: "", message: "" });
    setIsCompleted(false);
    setError("");
    setResponseMessage("");

    setTimeout(() => {
      setHistory([
        {
          type: "message",
          content: steps[0].content,
          hasSeparator: true,
        },
      ]);
      setStep(1);
    }, 10);
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setResponseMessage("Transmission received. Link established.");
    } catch {
      setResponseMessage("Transmission failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  }, [formData]);

  const isReviewMode = step >= steps.length;
  const currentStepConfig = steps[getCurrentStepIndex()];

  return (
    <div className="relative rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[380px] sm:h-[460px] bg-white/5 dark:bg-black/30 backdrop-blur-xl">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 dark:bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-110" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 cursor-pointer hover:brightness-110" />
          <span className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:brightness-110" />
        </div>
        <span className="text-xs text-zinc-400 font-mono tracking-wider">
          contact_terminal
        </span>
        <div className="flex items-center gap-2 text-zinc-500">
          <Minus className="w-3.5 h-3.5" />
          <Square className="w-3 h-3" />
          <X className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Scrollable Terminal Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {/* History */}
        {history.map((entry, index) => (
          <div key={index} className="mb-2">
            {entry.type === "message" && (
              <>
                <div className="text-emerald-400 font-semibold">{entry.content}</div>
                {entry.hasSeparator && (
                  <div className="border-b border-white/10 my-3" />
                )}
              </>
            )}
            {entry.type === "success-log" && (
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-zinc-400">{entry.prompt} </span>
                  <span className="text-white">{entry.value}</span>
                </div>
              </div>
            )}
            {entry.type === "error-log" && (
              <div>
                <div className="flex items-start gap-2 text-zinc-500">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-zinc-500">{entry.prompt} </span>
                    <span className="text-zinc-400 line-through">{entry.value}</span>
                  </div>
                </div>
                <div className="text-red-400 text-xs ml-6 mt-1">{entry.error}</div>
              </div>
            )}
          </div>
        ))}

        {/* Current Input Step */}
        {!isReviewMode && !isCompleted && currentStepConfig?.type === "input" && (
          <div className="mt-4">
            <div className="text-indigo-300 mb-3 text-base">
              {currentStepConfig.prompt}
            </div>

            <div className="flex items-center gap-2 bg-white/5 dark:bg-white/5 rounded-lg px-3 py-2 border border-white/10">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-zinc-500 text-xs shrink-0">
                {currentStepConfig.placeholder}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-slate-600 caret-white ml-2"
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs mt-2 ml-1">
                <XCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            <div className="text-zinc-600 text-xs mt-3 ml-1">
              Press Enter ↵ to continue
            </div>
          </div>
        )}

        {/* Review / Summary Screen */}
        {isReviewMode && !isCompleted && (
          <div className="mt-4">
            <div className="text-indigo-300 mb-4 text-base font-semibold">
              Beautiful! Here&apos;s what we&apos;ve got:
            </div>

            <div className="space-y-3 mb-6 bg-white/5 dark:bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs uppercase tracking-wider">Email</span>
                <span className="text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs uppercase tracking-wider">Name</span>
                <span className="text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-zinc-400 text-xs uppercase tracking-wider mt-0.5">Message</span>
                <span className="text-white text-right max-w-[60%] break-words">{formData.message}</span>
              </div>
            </div>

            <div className="text-zinc-400 text-sm mb-4">Look good?</div>

            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                disabled={isSubmitting}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 border border-white/10"
              >
                Restart
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? "Sending..." : "Send it!"}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {isCompleted && (
          <div className="mt-4 text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
            <p className="text-emerald-400 font-mono text-sm mb-2">
              {`> SYSTEM: ${responseMessage || "Processing complete."}`}
            </p>
            <p className="text-zinc-400 text-sm">
              Thanks for reaching out, {formData.name}. We&apos;ll get back to{" "}
              {formData.email} shortly.
            </p>
            <button
              onClick={handleRestart}
              className="mt-8 text-slate-500 hover:text-white flex items-center gap-2 transition-colors text-sm uppercase tracking-widest mx-auto"
            >
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none rounded-2xl" />
    </div>
  );
}

// ─── Marquee CSS ──────────────────────────────────────────────────────────────

const marqueeCSS = `
@keyframes marquee-x {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-x-rev {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes marquee-y {
  0%   { transform: translateY(0) rotate(180deg); }
  100% { transform: translateY(-50%) rotate(180deg); }
}
@keyframes marquee-y-rev {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
.contact-marquee-x       { animation: marquee-x     20s linear infinite; }
.contact-marquee-x-rev   { animation: marquee-x-rev 20s linear infinite; }
.contact-marquee-y       { animation: marquee-y     20s linear infinite; }
.contact-marquee-y-rev   { animation: marquee-y-rev 20s linear infinite; }
`;

const MARQUEE_TEXT =
  " 🚀 WANNA TALK WITH ME? 👋 • LET'S COLLABORATE 🤝 • OPEN FOR OPPORTUNITIES 💼 • LET'S BUILD SOMETHING AMAZING 🔧 • HIRE ME 🎯 • GOT A PROJECT? 💡 • LET'S CONNECT 🔗 • ";

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white dark:bg-black relative overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <style>{marqueeCSS}</style>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-display mb-4">Let&#39;s Connect</h2>
          <p className="text-gray-500">
            I&#39;m always open to discussing new projects, creative ideas or opportunities.
          </p>
        </div>

        {/* 4-Sided Marquee Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* Top Marquee */}
          <div className="absolute top-0 left-0 w-full h-6 sm:h-8 overflow-hidden bg-accent text-white flex items-center z-20">
            <div className="contact-marquee-x whitespace-nowrap font-bold font-mono text-sm">
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="absolute bottom-0 left-0 w-full h-6 sm:h-8 overflow-hidden bg-accent text-white flex items-center z-20">
            <div className="contact-marquee-x-rev whitespace-nowrap font-bold font-mono text-sm">
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>

          {/* Left Marquee (Vertical) */}
          <div className="absolute top-0 left-0 w-6 sm:w-8 h-full overflow-hidden bg-accent text-white flex items-center justify-center z-20">
            <div
              className="contact-marquee-y whitespace-nowrap font-bold font-mono text-sm"
              style={{ writingMode: "vertical-rl" }}
            >
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>

          {/* Right Marquee (Vertical) */}
          <div className="absolute top-0 right-0 w-6 sm:w-8 h-full overflow-hidden bg-accent text-white flex items-center justify-center z-20">
            <div
              className="contact-marquee-y-rev whitespace-nowrap font-bold font-mono text-sm"
              style={{ writingMode: "vertical-rl" }}
            >
              {MARQUEE_TEXT}{MARQUEE_TEXT}
            </div>
          </div>

          {/* Content Inner */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 sm:p-6 md:p-8 lg:p-12 border border-black/5 dark:border-white/5 relative z-10 m-2 sm:m-3 md:m-4">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${OWNER_INFO.email}`}
                      className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                    >
                      <div className="p-3 bg-white dark:bg-black rounded-lg border border-black/5 dark:border-white/10">
                        <Mail className="w-5 h-5" />
                      </div>
                      {OWNER_INFO.email}
                    </a>
                    <a
                      href={`tel:${OWNER_INFO.phone}`}
                      className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                    >
                      <div className="p-3 bg-white dark:bg-black rounded-lg border border-black/5 dark:border-white/10">
                        <Phone className="w-5 h-5" />
                      </div>
                      {OWNER_INFO.phone}
                    </a>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="p-3 bg-white dark:bg-black rounded-lg border border-black/5 dark:border-white/10">
                        <MapPin className="w-5 h-5" />
                      </div>
                      {OWNER_INFO.location}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Socials</h3>
                  <div className="flex gap-4">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white dark:bg-black rounded-lg border border-black/5 dark:border-white/10 hover:border-accent hover:text-accent transition-all"
                      >
                        {link.icon === "github" && <Github className="w-5 h-5" />}
                        {link.icon === "linkedin" && <Linkedin className="w-5 h-5" />}
                        {link.icon === "mail" && <Mail className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terminal Contact Form */}
              <TerminalContactForm />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
