import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

// Below-fold sections — only load their JS when the browser reaches them
const About           = dynamic(() => import("@/components/sections/About").then(m => m.About));
const WhatIDo         = dynamic(() => import("@/components/sections/WhatIDo").then(m => m.WhatIDo));
const Skills          = dynamic(() => import("@/components/sections/Skills").then(m => m.Skills));
const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects").then(m => m.FeaturedProjects));
const Testimonials    = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials));
const Timeline        = dynamic(() => import("@/components/sections/Timeline").then(m => m.Timeline));
const Contact         = dynamic(() => import("@/components/sections/Contact").then(m => m.Contact));

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        {/* Hero is eager — it's above the fold, must render immediately */}
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <FeaturedProjects />
        <Testimonials />
        <Timeline />
        <Contact />
      </div>
    </SmoothScroll>
  );
}

