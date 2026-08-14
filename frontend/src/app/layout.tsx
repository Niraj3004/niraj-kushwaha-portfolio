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
    "MERN stack developer Nepal",
    "Backend developer Nepal",
    "Frontend developer Nepal",
    "Freelance developer Nepal",
    "Portfolio website Nepal",
    "AI developer Nepal",
    "Freelance full-stack developer Nepal",
    "Software developer Nepal",
    "Full-stack developer in Kathmandu, Nepal",
    "Freelance full-stack developer in Kathmandu, Nepal",
    "Full-stack developer in Kathmandu, Nepal",
    "Software engineer in Kathmandu, Nepal",
    "React developer in Kathmandu, Nepal",
    "Next.js developer in Kathmandu, Nepal",
    "Node.js developer in Kathmandu, Nepal",
    "React Native developer in Kathmandu, Nepal",
    "Freelance full-stack developer in Kathmandu, Nepal",
    "Freelance software engineer in Kathmandu, Nepal",
    "Freelance React developer in Kathmandu, Nepal",
    "Freelance Next.js developer in Kathmandu, Nepal",
    "Freelance Node.js developer in Kathmandu, Nepal",
    "Freelance React Native developer in Kathmandu, Nepal",
    "Mobile app developer Nepal",
    "Mobile app developer Kathmandu",
    "Mobile app developer in Kathmandu, Nepal",
    "AI developer Nepal",
    "AI developer Kathmandu",
    "AI developer in Kathmandu, Nepal",
    "Machine learning developer Nepal",
    "Machine learning developer Kathmandu",
    "Machine learning developer in Kathmandu, Nepal",
    "Python developer Nepal",
    "Python developer Kathmandu",
    "Python developer in Kathmandu, Nepal",
    "Django developer Nepal",
    "Django developer Kathmandu",
    "Django developer in Kathmandu, Nepal",
    "Flask developer Nepal",
    "Flask developer Kathmandu",
    "Flask developer in Kathmandu, Nepal",
    "FastAPI developer Nepal",
    "FastAPI developer Kathmandu",
    "FastAPI developer in Kathmandu, Nepal",
    "GraphQL developer Nepal",
    "GraphQL developer Kathmandu",
    "GraphQL developer in Kathmandu, Nepal",
    "REST API developer Nepal",
    "REST API developer Kathmandu",
    "REST API developer in Kathmandu, Nepal",
    "API developer Nepal",
    "API developer Kathmandu",
    "API developer in Kathmandu, Nepal",
    "Web application developer Nepal",
    "Web application developer Kathmandu",
    "Web application developer in Kathmandu, Nepal",
    "Mobile application developer Nepal",
    "Mobile application developer Kathmandu",
    "Mobile application developer in Kathmandu, Nepal",
    "Full-stack developer Nepal",
    "Full-stack developer Kathmandu",
    "Full-stack developer in Kathmandu, Nepal",
    "Freelance full-stack developer Nepal",
    "Freelance full-stack developer Kathmandu",
    "Freelance full-stack developer in Kathmandu, Nepal",
    "Software developer Nepal",
    "Software developer Kathmandu",
    "Software developer in Kathmandu, Nepal",
    "Freelance software developer Nepal",
    "Freelance software developer Kathmandu",
    "Freelance software developer in Kathmandu, Nepal",
    "Backend developer Nepal",
    "Backend developer Kathmandu",
    "Backend developer in Kathmandu, Nepal",
    "Freelance backend developer Nepal",
    "Freelance backend developer Kathmandu",
    "Freelance backend developer in Kathmandu, Nepal",
    "Frontend developer Nepal",
    "Frontend developer Kathmandu",
    "Frontend developer in Kathmandu, Nepal",
    "Freelance frontend developer Nepal",
    "Freelance frontend developer Kathmandu",
    "Freelance frontend developer in Kathmandu, Nepal",
    "Full-stack developer Nepal",
    "Full-stack developer Kathmandu",
    "Full-stack developer in Kathmandu, Nepal",
    "Full-stack developer Nepal",
    "Full-stack developer Kathmandu",
    "Full-stack developer in Kathmandu, Nepal",
    "Software engineer Nepal",
    "Software engineer Kathmandu",
    "Software engineer in Kathmandu, Nepal",
    "Freelance software engineer Nepal",
    "Freelance software engineer Kathmandu",
    "Freelance software engineer in Kathmandu, Nepal",
    "MERN stack developer Nepal",
    "MERN stack developer Kathmandu",
    "MERN stack developer in Kathmandu, Nepal",
    "MEAN stack developer Nepal",
    "MEAN stack developer Kathmandu",
    "MEAN stack developer in Kathmandu, Nepal",
    

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
    "https://www.linkedin.com/in/nirajkushwaha3004",
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
