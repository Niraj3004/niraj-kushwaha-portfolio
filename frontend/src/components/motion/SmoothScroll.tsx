// SmoothScroll: removed Lenis to keep the main thread free.
// Native smooth scrolling is handled via `scroll-behavior: smooth` in globals.css.
// This wrapper is kept so all import sites don't need updating.

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => (
  <>{children}</>
);
