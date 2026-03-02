"use client";

import { useState, useRef, useEffect } from "react";
import { OWNER_INFO, SOCIAL_LINKS } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from "lucide-react";

// ─── Terminal Contact Form ───────────────────────────────────────────────────

type Step = "greeting" | "email" | "name" | "message" | "review" | "success";

interface FormData {
  email: string;
  name: string;
  message: string;
}

function TerminalContactForm() {
  const [step, setStep] = useState<Step>("greeting");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<FormData>({ email: "", name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState<string[]>([
    `Welcome to ${OWNER_INFO.name.split(" ")[0]}'s contact terminal.`,
    "Type your details below to send a message.",
    "",
  ]);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, step]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const addHistory = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSend = async () => {
    setIsSubmitting(true);
    addHistory(["", "➜  Sending message..."]);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    addHistory([
      "✓  Message sent successfully!",
      `   I'll get back to you at ${data.email} soon.`,
      "",
    ]);
    setStep("success");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      processInput();
    }
  };

  const processInput = () => {
    const val = input.trim();

    if (step === "greeting") {
      addHistory([`➜  ~ ${val || "(enter)"}`, ""]);
      setInput("");
      setStep("email");
      return;
    }

    if (step === "email") {
      if (!validateEmail(val)) {
        setError("Please enter a valid email address.");
        return;
      }
      addHistory([`➜  Enter email: ${val}`, ""]);
      setData((d) => ({ ...d, email: val }));
      setInput("");
      setError("");
      setStep("name");
      return;
    }

    if (step === "name") {
      if (val.length < 2) {
        setError("Name must be at least 2 characters.");
        return;
      }
      addHistory([`➜  Enter name: ${val}`, ""]);
      setData((d) => ({ ...d, name: val }));
      setInput("");
      setError("");
      setStep("message");
      return;
    }

    if (step === "message") {
      if (val.length < 10) {
        setError("Message must be at least 10 characters.");
        return;
      }
      addHistory([`➜  Message: ${val}`, ""]);
      setData((d) => ({ ...d, message: val }));
      setInput("");
      setError("");
      setStep("review");
      return;
    }

    if (step === "review") {
      if (val.toLowerCase() === "y" || val.toLowerCase() === "yes") {
        addHistory([`➜  Confirm send? [y/n]: ${val}`, ""]);
        setInput("");
        handleSend();
      } else {
        addHistory([
          `➜  Confirm send? [y/n]: ${val}`,
          "Cancelled. Refresh to start over.",
          "",
        ]);
        setInput("");
        setStep("success");
      }
      return;
    }
  };

  const prompt: Record<Step, string> = {
    greeting: "➜  ~ Press Enter to begin:",
    email: "➜  Enter email:",
    name: "➜  Enter name:",
    message: "➜  Message:",
    review: "➜  Confirm send? [y/n]:",
    success: "",
  };

  const reviewLines =
    step === "review"
      ? [
          "┌─ Review your message ──────────────────",
          `│  From:    ${data.name} <${data.email}>`,
          `│  To:      ${OWNER_INFO.email}`,
          `│  Message: ${data.message.slice(0, 60)}${data.message.length > 60 ? "…" : ""}`,
          "└────────────────────────────────────────",
          "",
        ]
      : [];

  return (
    <div className="bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[380px] sm:h-[460px]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/10 shrink-0">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-zinc-400 font-mono">
          contact@{OWNER_INFO.website}
        </span>
      </div>

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 text-zinc-300">
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("✓")
                ? "text-green-400"
                : line.startsWith("➜")
                ? "text-cyan-400"
                : "text-zinc-400"
            }
          >
            {line || <>&nbsp;</>}
          </div>
        ))}

        {reviewLines.map((line, i) => (
          <div key={`r${i}`} className="text-pink-300 font-mono text-xs">
            {line || <>&nbsp;</>}
          </div>
        ))}

        {step === "success" && (
          <div className="text-green-400 mt-2">
            Session closed. Have a great day! 🚀
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {step !== "success" && (
        <div className="shrink-0 border-t border-white/10 px-4 py-3 bg-zinc-900/60">
          {error && (
            <div className="text-red-400 text-xs font-mono mb-1">{error}</div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-cyan-400 font-mono text-sm mt-0.5 shrink-0">
              {prompt[step]}
            </span>
            {step === "message" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                rows={2}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none resize-none placeholder:text-zinc-600"
                placeholder="Type here… (Enter to submit)"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={step === "email" ? "email" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder:text-zinc-600 caret-cyan-400"
                placeholder={step === "greeting" ? "press Enter…" : ""}
                autoComplete="off"
              />
            )}
          </div>
        </div>
      )}
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
