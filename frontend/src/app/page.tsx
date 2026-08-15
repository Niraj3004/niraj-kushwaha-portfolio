import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

async function getHomepageData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${baseUrl}/homepage`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await getHomepageData();

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <Hero data={data?.hero} />
        <About data={data?.about} />
        <Skills data={data?.skills} />
        <FeaturedProjects />
        <Testimonials />
        <Timeline data={data?.timeline} />
        <Contact />
      </div>
    </SmoothScroll>
  );
}
