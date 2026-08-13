"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Code, Briefcase } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { MagneticButton } from "../motion/MagneticButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Honeypot spam trap
    if (data.honeypot) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again later, or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Copy & Links */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <h2 className="text-display font-display text-ink mb-6 tracking-tight">
                Let's build something.
              </h2>
              <p className="text-h3 text-muted font-sans font-normal leading-relaxed">
                Have a project, a role, or an idea for Nepal? Send a message — I'll get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="pt-8 flex flex-col gap-4">
                <a href="mailto:hello@example.com" className="inline-flex items-center gap-4 text-body font-medium text-ink hover:text-accent transition-colors group">
                  <div className="p-3 rounded-full bg-surface border border-hairline group-hover:border-accent transition-colors">
                    <Mail size={20} />
                  </div>
                  hello@example.com
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-body font-medium text-ink hover:text-accent transition-colors group">
                  <div className="p-3 rounded-full bg-surface border border-hairline group-hover:border-accent transition-colors">
                    <Code size={20} />
                  </div>
                  GitHub Profile
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-body font-medium text-ink hover:text-accent transition-colors group">
                  <div className="p-3 rounded-full bg-surface border border-hairline group-hover:border-accent transition-colors">
                    <Briefcase size={20} />
                  </div>
                  LinkedIn Profile
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
              <div className="bg-surface rounded-3xl p-8 md:p-12 border border-hairline relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Honeypot field (hidden from real users) */}
                      <input 
                        type="text" 
                        {...register("honeypot")} 
                        className="hidden" 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />

                      <div className="space-y-2">
                        <label htmlFor="name" className="text-small font-semibold text-ink uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          id="name"
                          {...register("name")}
                          className="w-full h-14 px-4 rounded-xl bg-white border border-hairline focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-small font-semibold text-ink uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="w-full h-14 px-4 rounded-xl bg-white border border-hairline focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-small font-semibold text-ink uppercase tracking-wider">
                          Message
                        </label>
                        <textarea
                          id="message"
                          {...register("message")}
                          rows={5}
                          className="w-full p-4 rounded-xl bg-white border border-hairline focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                          placeholder="Tell me about your project..."
                        />
                        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                      </div>

                      {errorMsg && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                          {errorMsg}
                        </div>
                      )}

                      <div className="pt-2">
                        <MagneticButton 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-14 px-8 text-body flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : (
                            <>
                              Send Message
                              <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </MagneticButton>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-accent mb-6" />
                      </motion.div>
                      <h3 className="text-h3 font-display text-ink mb-2">Message Sent</h3>
                      <p className="text-body text-muted max-w-sm">
                        Thanks — your message is on its way. I'll reply soon.
                      </p>
                      
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 text-small font-medium text-accent hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
};
