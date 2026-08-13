import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const BASE_URL = "https://nirajkushwaha.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Niraj Kushwaha — Full-Stack Developer",
    template: "%s | Niraj Kushwaha",
  },
  description:
    "Niraj Kushwaha is a full-stack developer from Kathmandu building performant web apps, mobile apps, and AI-assisted tools with Next.js, React Native, and Node.js.",
  keywords: [
    "Niraj Kushwaha",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Nepal developer",
    "Kathmandu developer",
    "web developer portfolio",
  ],
  authors: [{ name: "Niraj Kushwaha", url: BASE_URL }],
  creator: "Niraj Kushwaha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Niraj Kushwaha",
    title: "Niraj Kushwaha — Full-Stack Developer",
    description:
      "Full-stack developer from Kathmandu building web apps, mobile apps, and AI-assisted tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Niraj Kushwaha — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niraj Kushwaha — Full-Stack Developer",
    description:
      "Full-stack developer from Kathmandu building web apps, mobile apps, and AI-assisted tools.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
