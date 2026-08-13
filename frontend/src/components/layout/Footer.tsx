"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";

export const Footer = () => {
  return (
    <footer className="border-t border-hairline bg-surface py-12 md:py-16 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <Reveal>
            <div className="max-w-sm">
              <h3 className="font-display font-bold text-h3 mb-2">
                NK<span className="text-accent">.</span>
              </h3>
              <p className="text-muted text-small">
                Built and designed by Niraj Kushwaha — Kathmandu, Nepal.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-6">
              <a 
                href="https://github.com/Niraj3004" 
                target="_blank" 
                rel="noreferrer"
                className="text-small font-medium hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/nirajkushwaha" 
                target="_blank" 
                rel="noreferrer"
                className="text-small font-medium hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:infotechevolvix@gmail.com" 
                className="text-small font-medium hover:text-accent transition-colors"
              >
                Email
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-hairline/50 text-small text-muted">
          <p>© {new Date().getFullYear()} Niraj Kushwaha. All rights reserved.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-ink transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </Container>
    </footer>
  );
};
