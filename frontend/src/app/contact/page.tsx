import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Niraj Kushwaha — available for freelance projects, full-time roles, and collaboration opportunities.",
  openGraph: {
    title: "Contact | Niraj Kushwaha",
    description: "Available for freelance projects, full-time roles, and collaboration opportunities.",
    url: "https://nirajkushwaha.dev/contact",
  },
  alternates: { canonical: "https://nirajkushwaha.dev/contact" },
};


export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="flex-1 bg-white min-h-screen pt-20">
        <Contact />
      </main>
    </SmoothScroll>
  );
}
