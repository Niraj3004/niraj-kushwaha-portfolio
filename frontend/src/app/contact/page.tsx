import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="flex-1 bg-white min-h-screen pt-20">
        <Contact />
      </main>
    </SmoothScroll>
  );
}
