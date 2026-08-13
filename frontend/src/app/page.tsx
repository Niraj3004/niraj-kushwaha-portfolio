import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <FeaturedProjects />
        <Testimonials />
        <Timeline />
      </div>
    </SmoothScroll>
  );
}
