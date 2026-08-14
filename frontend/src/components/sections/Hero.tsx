"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Code, Database, Smartphone } from "lucide-react";
import { Container } from "../ui/Container";
import Link from "next/link";

export const Hero = ({ data }: { data?: any }) => {
  // Fallbacks
  const headline = data?.headline || "Niraj";
  const subheadline = data?.subheadline || "FULL STACK DEVELOPER";
  
  // Floating animation configuration
  const floatingAnim = (duration: number, delay: number = 0) => ({
    y: [0, -15, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24 bg-[#F8FAFC]">
      {/* Soft Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-100/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-indigo-100/40 rounded-full blur-[80px]"></div>
      </div>

      <Container className="relative z-10 w-full h-full flex items-center justify-center min-h-[80vh]">
        
        {/* Main Center Image */}
        <div className="relative w-full max-w-4xl flex justify-center items-end h-[60vh] md:h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 h-full max-w-lg lg:max-w-xl"
          >
            <img 
              src="/niraj.png" 
              alt="Niraj Kushwaha" 
              className="w-full h-full object-contain object-bottom drop-shadow-2xl" 
            />
          </motion.div>

          {/* Left Side: Floating Intro Card */}
          <motion.div 
            className="absolute left-0 lg:-left-12 top-1/4 z-20 hidden sm:block"
            animate={floatingAnim(4)}
          >
            <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 flex flex-col items-start gap-1">
              <span className="text-sm font-medium text-muted flex items-center gap-2">
                👋 Hello I am
              </span>
              <h2 className="text-3xl font-bold text-ink tracking-tight">{headline}</h2>
            </div>
          </motion.div>

          {/* Left Side: Floating Profession Badge */}
          <motion.div 
            className="absolute left-10 lg:-left-4 top-2/4 z-20 hidden sm:block"
            animate={floatingAnim(5, 1)}
          >
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-white/20">
              <span className="text-xs font-semibold text-ink/70 tracking-widest uppercase">
                {subheadline}
              </span>
            </div>
          </motion.div>

          {/* Right Side: Floating Icons */}
          <div className="absolute right-0 lg:-right-12 top-1/4 bottom-1/4 flex flex-col justify-between items-end z-20 hidden sm:flex">
            
            {/* Top Icon */}
            <motion.div animate={floatingAnim(4.5, 0.5)} className="flex flex-col items-center gap-2 mr-12">
              <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-rose-500 border border-rose-50">
                <Code size={24} />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Frontend</span>
            </motion.div>

            {/* Middle Icon */}
            <motion.div animate={floatingAnim(5.5, 1.5)} className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-full bg-blue-600 shadow-xl shadow-blue-600/20 flex items-center justify-center text-white border-4 border-white">
                <Database size={32} />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-muted uppercase mt-1">Backend</span>
            </motion.div>

            {/* Bottom Icon */}
            <motion.div animate={floatingAnim(4, 2)} className="flex flex-col items-center gap-2 mr-8">
              <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-violet-500 border border-violet-50">
                <Smartphone size={20} />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Mobile</span>
            </motion.div>
          </div>

          {/* Mobile Only: Simple Intro (visible only on small screens) */}
          <div className="absolute bottom-10 inset-x-0 z-30 flex flex-col items-center text-center sm:hidden">
             <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl w-11/12 max-w-sm">
                <span className="text-sm font-medium text-muted">👋 Hello I am</span>
                <h2 className="text-3xl font-bold text-ink mb-1">{headline}</h2>
                <span className="text-xs font-semibold text-accent tracking-widest uppercase">{subheadline}</span>
             </div>
          </div>

        </div>
      </Container>

      {/* Far Left Social Pill */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6 bg-white/80 backdrop-blur px-3 py-6 rounded-full shadow-lg border border-hairline"
      >
        <Link href="#" className="text-muted hover:text-ink hover:scale-110 transition-all p-2 rounded-full hover:bg-surface">
          <Github size={20} />
        </Link>
        <Link href="#" className="text-muted hover:text-blue-600 hover:scale-110 transition-all p-2 rounded-full hover:bg-surface">
          <Linkedin size={20} />
        </Link>
        <Link href="#" className="text-muted hover:text-sky-500 hover:scale-110 transition-all p-2 rounded-full hover:bg-surface">
          <Twitter size={20} />
        </Link>
      </motion.div>

    </section>
  );
};
