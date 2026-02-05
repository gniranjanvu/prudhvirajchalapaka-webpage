"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { OWNER_INFO, SOCIAL_LINKS } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const marqueeText = " WANNA TALK WITH ME? 👋 • LET'S COLLABORATE • ";

  return (
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-black relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-display mb-4">Let's Connect</h2>
          <p className="text-gray-500">I'm always open to discussing new projects, creative ideas or opportunities.</p>
        </div>

        {/* 4-Sided Marquee Container */}
        <div className="relative max-w-5xl mx-auto p-8 md:p-12">

          {/* Top Marquee */}
          <div className="absolute top-0 left-0 w-full h-8 overflow-hidden bg-accent text-white flex items-center z-20">
            <motion.div
              className="whitespace-nowrap font-bold font-mono text-sm"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {marqueeText.repeat(10)}
            </motion.div>
          </div>

          {/* Bottom Marquee */}
          <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden bg-accent text-white flex items-center z-20">
            <motion.div
              className="whitespace-nowrap font-bold font-mono text-sm"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {marqueeText.repeat(10)}
            </motion.div>
          </div>

          {/* Left Marquee (Vertical) */}
          <div className="absolute top-0 left-0 w-8 h-full overflow-hidden bg-accent text-white flex flex-col justify-center items-center z-20">
            <motion.div
              className="whitespace-nowrap font-bold font-mono text-sm"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {marqueeText.repeat(10)}
            </motion.div>
          </div>

          {/* Right Marquee (Vertical) */}
          <div className="absolute top-0 right-0 w-8 h-full overflow-hidden bg-accent text-white flex flex-col justify-center items-center z-20">
            <motion.div
              className="whitespace-nowrap font-bold font-mono text-sm"
              style={{ writingMode: "vertical-rl" }}
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {marqueeText.repeat(10)}
            </motion.div>
          </div>


          {/* Content Inner */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-8 md:p-12 border border-black/5 dark:border-white/5 relative z-10 m-4">
            <div className="grid md:grid-cols-2 gap-12">

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${OWNER_INFO.email}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
                      <div className="p-3 bg-white dark:bg-black rounded-lg border border-black/5 dark:border-white/10">
                        <Mail className="w-5 h-5" />
                      </div>
                      {OWNER_INFO.email}
                    </a>
                    <a href={`tel:${OWNER_INFO.phone}`} className="flex items-center gap-4 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors">
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
                        {link.icon === 'github' && <Github className="w-5 h-5" />}
                        {link.icon === 'linkedin' && <Linkedin className="w-5 h-5" />}
                        {link.icon === 'mail' && <Mail className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white dark:bg-black p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                      <Input placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                      <Input type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Subject</label>
                    <Input placeholder="Project Inquiry" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Message</label>
                    <Textarea className="min-h-[120px]" placeholder="Tell me about your project..." required />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
