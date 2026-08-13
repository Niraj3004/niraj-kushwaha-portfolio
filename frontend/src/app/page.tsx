import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <About />
      </div>
    </SmoothScroll>
  );
}
