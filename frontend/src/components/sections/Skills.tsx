"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2, Server, Cloud, Sparkles, Layout,
  Terminal as TerminalIcon, Cpu, Zap, WifiOff, Fingerprint, Rocket, Orbit
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const ALL_SKILLS = [
  {
    category: "Languages",
    icon: Code2,
    description: "Core programming languages for logic and architecture.",
    color: "from-blue-500/10 to-indigo-500/10",
    textColor: "text-blue-500",
    skills: [
      { name: "JavaScript", level: 5 }, { name: "TypeScript", level: 4 },
      { name: "Python", level: 4 }, { name: "Java", level: 3 },
      { name: "C++", level: 3 }, { name: "SQL", level: 4 }
    ]
  },
  {
    category: "Frontend",
    icon: Layout,
    description: "Building beautiful, interactive user interfaces.",
    color: "from-pink-500/10 to-rose-500/10",
    textColor: "text-pink-500",
    skills: [
      { name: "React", level: 5 }, { name: "Next.js", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 }, { name: "HTML/CSS", level: 5 }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    description: "Scalable server-side applications and APIs.",
    color: "from-emerald-500/10 to-green-500/10",
    textColor: "text-emerald-500",
    skills: [
      { name: "Node.js", level: 5 }, { name: "Express.js", level: 5 },
      { name: "MongoDB", level: 4 }, { name: "PostgreSQL", level: 3 },
      { name: "REST APIs", level: 5 }
    ]
  },
  {
    category: "AI & Cloud",
    icon: Cloud,
    description: "Deployment, infrastructure, and modern AI tools.",
    color: "from-purple-500/10 to-violet-500/10",
    textColor: "text-purple-500",
    skills: [
      { name: "Docker", level: 3 },
      { name: "Prompt Engineering", level: 5 }, { name: "AI Tools", level: 4 },
      { name: "CI/CD", level: 3 }, { name: "Git", level: 5 }
    ]
  },
];

// --- Utilities ---
const getSkillLogo = (name: string) => {
  const n = name.toLowerCase();
  const logos: Record<string, string> = {
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'sql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg',
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    'tailwind css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    'framer motion': 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg',
    'html/css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'rest apis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
    'graphql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'ci/cd': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
    'prompt engineering': 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
    'ai tools': 'https://cdn.worldvectorlogo.com/logos/openai-2.svg'
  };
  return logos[n] || null;
};

const getSkillCodeSnippet = (skill: string) => {
  const snippets: Record<string, React.ReactNode> = {
    'React': (
      <>
        <span className="text-pink-400">function</span> <span className="text-blue-300">Hero</span>() {'{\n'}
        {'  '}<span className="text-pink-400">const</span> [magic, setMagic] = <span className="text-blue-300">useState</span>(<span className="text-orange-400">true</span>);{'\n'}
        {'  '}<span className="text-pink-400">return</span> ({'\n'}
        {'    '}&lt;<span className="text-emerald-400">motion.div</span> <span className="text-cyan-300">drag</span>&gt;{'\n'}
        {'      '}{'{'}magic ? <span className="text-green-300">"✨"</span> : <span className="text-green-300">"🔥"</span>{'}'}{'\n'}
        {'    '}&lt;/<span className="text-emerald-400">motion.div</span>&gt;{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
    'Next.js': (
      <>
        <span className="text-pink-400">export async function</span> <span className="text-blue-300">generateMetadata</span>() {'{\n'}
        {'  '}<span className="text-pink-400">return</span> {'{\n'}
        {'    '}title: <span className="text-green-300">'Niraj Portfolio'</span>,{'\n'}
        {'    '}description: <span className="text-green-300">'Blazing fast App Router'</span>,{'\n'}
        {'  }'}{'\n'}
        {'}'}
      </>
    ),
    'Node.js': (
      <>
        <span className="text-pink-400">const</span> server = http.<span className="text-blue-300">createServer</span>((req, res) =&gt; {'{\n'}
        {'  '}res.<span className="text-blue-300">writeHead</span>(<span className="text-orange-400">200</span>);{'\n'}
        {'  '}res.<span className="text-blue-300">end</span>(<span className="text-green-300">'System Online.'</span>);{'\n'}
        {'});\n'}
        server.<span className="text-blue-300">listen</span>(<span className="text-orange-400">5000</span>);
      </>
    ),
    'Python': (
      <>
        <span className="text-pink-400">def</span> <span className="text-blue-300">train_model</span>(data):{'\n'}
        {'    '}model = <span className="text-blue-300">Transformer</span>(){'\n'}
        {'    '}model.<span className="text-blue-300">compile</span>(optimizer=<span className="text-green-300">'adam'</span>){'\n'}
        {'    '}<span className="text-pink-400">return</span> model.<span className="text-blue-300">fit</span>(data)
      </>
    ),
    'MongoDB': (
      <>
        db.projects.<span className="text-blue-300">aggregate</span>([{'\n'}
        {'  '}...{'{'} <span className="text-cyan-300">$match</span>: {'{'} isFeatured: <span className="text-orange-400">true</span> {'}'} {'}'},{'\n'}
        {'  '}...{'{'} <span className="text-cyan-300">$sort</span>: {'{'} launchDate: <span className="text-orange-400">-1</span> {'}'} {'}'}{'\n'}
        ]);
      </>
    ),
  };
  
  if (snippets[skill]) return snippets[skill];
  
  const varName = skill.replace(/[^a-zA-Z]/g, '');
  const importName = skill.toLowerCase().replace(/ /g, '-');
  return (
    <>
      <span className="text-slate-500 italic">// Initialize {skill}</span>{'\n'}
      <span className="text-pink-400">import</span> {varName} <span className="text-pink-400">from</span> <span className="text-green-300">'{importName}'</span>;{'\n\n'}
      <span className="text-pink-400">const</span> init = <span className="text-pink-400">async</span> () =&gt; {'{\n'}
      {'  '}<span className="text-pink-400">await</span> {varName}.<span className="text-blue-300">connect</span>();{'\n'}
      {'  '}console.<span className="text-blue-300">log</span>(<span className="text-green-300">'Ready.'</span>);{'\n'}
      {'};'}
    </>
  );
};

// Feature 4: Ultra-Premium Glass Panel (Optimized for maximum FPS)
const GlassPanel = ({ children, className, color }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }} // Animate on both scroll up and down
      whileHover={{ y: -5 }} // Simple 2D hover instead of expensive 3D calculation
      transition={{ duration: 0.4 }}
      className={cn(
        "relative rounded-[2rem] p-6 lg:p-8 flex flex-col group transition-all duration-300",
        className
      )}
    >
      {/* Premium Glass Container (Zero CSS blur) */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-slate-900/95 overflow-hidden shadow-2xl -z-20">
        {/* Hardware-accelerated solid glow instead of blur-[80px] */}
        <div 
          className={cn("absolute -inset-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full", color)} 
          style={{ background: `radial-gradient(circle, currentColor 0%, transparent 70%)` }}
        />
        
        {/* Top Border Hairline Highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </motion.div>
  );
};

// Feature 5: Sleek Circular Proficiency Ring
const ProficiencyRing = ({ level, iconUrl }: { level: number, iconUrl: string | null }) => {
  const percentage = (level / 5) * 100;
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[32px] h-[32px] flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90 absolute inset-0">
        <circle
          cx="16" cy="16" r={radius}
          stroke="currentColor" strokeWidth="1.5" fill="transparent"
          className="text-white/10"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          cx="16" cy="16" r={radius}
          stroke="currentColor" strokeWidth="1.5" fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="text-white"
        />
      </svg>
      {iconUrl ? (
        <img src={iconUrl} alt="icon" className="w-[14px] h-[14px] object-contain relative z-10 brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
      ) : (
        <Code2 size={12} className="text-white/50 relative z-10" />
      )}
    </div>
  );
};

// Feature 3: Interactive Terminal (Dark Mode native)
const CodeTerminal = ({ code }: { code: React.ReactNode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={code as any}
      className="w-full h-full min-h-[220px] rounded-[2rem] bg-[#0f172a] border border-white/10 overflow-hidden shadow-2xl font-mono text-sm relative"
    >
      <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <span className="text-white/40 text-[10px] uppercase tracking-widest ml-4 font-semibold">sys_core.tsx</span>
      </div>
      <div className="p-6 overflow-x-auto text-white/80 font-mono text-xs leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {code}
        </pre>
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-3 bg-white ml-1 translate-y-0.5"
        />
      </div>
    </motion.div>
  );
};

export const Skills = ({ data }: { data?: any[] }) => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string>("React");
  const constraintsRef = useRef(null);

  const groups = data && data.length > 0
    ? data.map(g => ({ ...g, skills: g.items.map((i: any) => ({ name: i, level: 4 })) }))
    : ALL_SKILLS;

  const tabs = ["All", ...groups.map(g => g.category)];

  const filteredGroups = activeTab === "All"
    ? groups
    : groups.filter(g => g.category === activeTab);

  return (
    <section id="skills" ref={constraintsRef} className="py-32 overflow-hidden relative bg-[#020617] text-white">
      {/* Breathtaking Animated Aurora Background - Optimized for 60fps (No CSS blur) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen translate-z-0">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.25)_0%,transparent_60%)]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(192,38,211,0.2)_0%,transparent_60%)]" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.2)_0%,transparent_60%)]" 
        />
      </div>
      
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16 relative z-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30">
              Technical Arsenal
            </h2>
          </div>
        </motion.div>

        {/* Minimalist Tabs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12 relative z-20"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 relative border backdrop-blur-sm",
                activeTab === tab ? "text-slate-900 border-transparent shadow-lg" : "text-white/60 border-white/10 hover:text-white hover:bg-white/5"
              )}
            >
              {activeTab === tab && (
                <motion.div layoutId="activeTabAurora" className="absolute inset-0 bg-white rounded-full -z-10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </motion.div>

        {/* Flattened Bento Grid (Aurora Glass aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)] relative z-20" ref={constraintsRef}>
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, i) => {
              const Icon = group.icon || Sparkles;
              let spanClass = "col-span-1 md:col-span-1 lg:col-span-1";
              if (activeTab === "All") {
                if (i === 0) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1";
                if (i === 1) spanClass = "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1";
                if (i === 2) spanClass = "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1";
                if (i === 3) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1";
              }

              return (
                <GlassPanel 
                  key={group.category} 
                  color={group.color}
                  className={spanClass}
                >
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transform -rotate-12 group-hover:rotate-0 transition-all duration-700">
                    <Icon size={220} strokeWidth={1} />
                  </div>

                  <div className="flex items-start gap-5 mb-8">
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] text-white backdrop-blur-md">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="pt-1.5">
                      <h4 className="text-2xl font-bold text-white tracking-tight mb-1.5 drop-shadow-sm">{group.category}</h4>
                      <p className="text-sm text-white/70 font-medium max-w-[200px] leading-relaxed line-clamp-2">{group.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto relative min-h-[120px]">
                    {group.skills.map((skill: any, idx: number) => {
                      const logo = getSkillLogo(skill.name);
                      return (
                        <motion.div
                          key={skill.name}
                          drag={true}
                          dragConstraints={constraintsRef}
                          dragElastic={0.5}
                          whileDrag={{ scale: 1.15, zIndex: 50, cursor: "grabbing" }}
                          initial={{ opacity: 0, y: 40, scale: 0.5 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: false, margin: "100px" }}
                          transition={{ delay: 0.02 * idx, type: "spring", stiffness: 300, damping: 20 }}
                          onHoverStart={() => setHoveredSkill(skill.name)}
                          onClick={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const x = (rect.left + rect.width / 2) / window.innerWidth;
                            const y = (rect.top + rect.height / 2) / window.innerHeight;
                            // Re-added colorful confetti on click per request!
                            confetti({ particleCount: 30, spread: 60, origin: { x, y }, colors: ['#4F46E5', '#10B981', '#F43F5E', '#3B82F6', '#EAB308'] });
                          }}
                          className="cursor-grab active:cursor-grabbing z-10"
                        >
                          <div className="flex items-center gap-3 pr-4 p-1.5 rounded-full bg-slate-800 border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-slate-700 hover:border-white/30 transition-all select-none">
                            <ProficiencyRing level={skill.level || 4} iconUrl={logo} />
                            <span className="text-sm font-bold text-white tracking-wide drop-shadow-sm">{skill.name}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </GlassPanel>
              );
            })}
          </AnimatePresence>

          {/* Interactive Code Preview integrated into the Bento Grid */}
          {activeTab === "All" && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="hidden lg:flex flex-col lg:col-span-2 lg:row-span-1 relative"
            >
              <div className="flex flex-col h-full mt-2">
                <div className="mb-4 flex items-center gap-2 text-white">
                  <Fingerprint className="text-white/60" size={16} />
                  <h4 className="font-mono font-bold text-xs uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Runtime Terminal</h4>
                </div>
                <div className="flex-1 flex flex-col min-h-[220px]">
                  <CodeTerminal code={getSkillCodeSnippet(hoveredSkill)} />
                </div>
                <p className="text-[10px] text-white/50 mt-3 text-center font-mono uppercase tracking-widest">
                  Hover orbs to inspect • Click for confetti
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};
