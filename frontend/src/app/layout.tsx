import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const BASE_URL = "https://nirajkushwaha.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Niraj Kushwaha — Full-Stack Developer in Kathmandu, Nepal",
    template: "%s | Niraj Kushwaha",
  },
  description:
    "Niraj Kushwaha is a full-stack developer from Kathmandu, Nepal. He builds high-performance web apps, mobile apps, and AI-assisted tools using Next.js, React Native, Node.js, and MongoDB.",
  keywords: [
    "Niraj Kushwaha",
    "Niraj Kushwaha developer",
    "Niraj Kushwaha Nepal",
    "Niraj Kushwaha portfolio",
    "full-stack developer Nepal",
    "full-stack developer Kathmandu",
    "web developer Nepal",
    "React developer Nepal",
    "Next.js developer Nepal",
    "Node.js developer Nepal",
    "React Native developer Nepal",
    "software engineer Kathmandu",
    "Islington College developer",
    "AI developer Nepal",
  ],
  authors: [{ name: "Niraj Kushwaha", url: BASE_URL }],
  creator: "Niraj Kushwaha",
  publisher: "Niraj Kushwaha",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Niraj Kushwaha",
    title: "Niraj Kushwaha — Full-Stack Developer in Kathmandu, Nepal",
    description:
      "Niraj Kushwaha — Full-stack developer from Kathmandu building web apps, mobile apps, and AI tools with Next.js, React Native, and Node.js.",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Niraj Kushwaha — Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niraj Kushwaha — Full-Stack Developer",
    description:
      "Full-stack developer from Kathmandu building web apps, mobile apps, and AI tools.",
    images: [`${BASE_URL}/opengraph-image`],
    creator: "@nirajkushwaha",
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
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/favicon.ico" }],
  },
  verification: {
    // Add your Google Search Console verification token here once you verify
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data — tells Google exactly who Niraj Kushwaha is
// This is the #1 signal for Google Knowledge Panel + name-based search ranking
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Niraj Kushwaha",
  alternateName: ["Niraj", "Niraj K"],
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  jobTitle: "Full-Stack Developer",
  description:
    "Niraj Kushwaha is a full-stack developer from Kathmandu, Nepal who builds web apps, mobile apps, and AI-assisted tools using Next.js, React, React Native, Node.js, and MongoDB.",
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Independent",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Islington College",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  nationality: {
    "@type": "Country",
    name: "Nepal",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "JavaScript",
    "Full-Stack Web Development",
    "Mobile App Development",
    "AI-assisted development",
    "Software Engineering",
  ],
  sameAs: [
    "https://github.com/Niraj3004",
    // Add your LinkedIn URL here:
    // "https://www.linkedin.com/in/nirajkushwaha",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Niraj Kushwaha",
  url: BASE_URL,
  description:
    "Portfolio of Niraj Kushwaha — Full-Stack Developer from Kathmandu, Nepal.",
  author: {
    "@type": "Person",
    name: "Niraj Kushwaha",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
      <head>
        {/* JSON-LD: Person schema — strongest Google signal for name searches */}
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          strategy="beforeInteractive"
        />
        {/* JSON-LD: Website schema */}
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
