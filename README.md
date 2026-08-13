# Niraj Kushwaha — Full-Stack Developer Portfolio

> A modern, responsive and motion-led full-stack developer portfolio built to showcase projects, technical skills, experience, education and professional work.

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-API-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)](https://www.mongodb.com/)

---

## 🌐 Overview

This repository contains my personal full-stack developer portfolio.

The portfolio is designed as a professional digital identity and project showcase rather than a simple static resume website.

It presents my:

- Professional introduction
- About
- Technical skills
- Featured projects
- Project case studies
- Education
- Experience
- Contact information
- Professional links
- Optional blog content
- Responsive interface
- Modern animations and interactions

The project uses a Next.js frontend with a lightweight Express API for portfolio content and contact functionality.

---

## ✨ Features

### 🏠 Home

- Animated hero section
- Professional introduction
- Call-to-action buttons
- About preview
- Skills preview
- Featured projects
- Experience preview
- Contact section
- Professional/social links

### 👨‍💻 About

- Personal introduction
- Developer background
- Education
- Technical interests
- Professional approach
- Career direction

### 🛠️ Skills

Technology and skill categories covering:

- Frontend development
- Backend development
- Database technologies
- Programming languages
- Tools and platforms
- AI-related technologies

### 🚀 Projects

Project showcase containing:

- Project title
- Project summary
- Technology tags
- Project images
- Detailed project information
- Live project link
- Repository link
- Featured project support

Individual project pages can be accessed through project slugs.

### 💼 Experience

Professional experience presented in a structured and easy-to-read format.

### 🎓 Education

Educational background and relevant academic information.

### 📩 Contact

A contact form allowing visitors to send:

- Name
- Email
- Message

The contact system supports validation, spam protection and submission handling.

### ✍️ Blog

Optional blog functionality for publishing:

- Technical articles
- Development experiences
- Tutorials
- AI-related content
- Learning notes
- Software engineering topics

### 🔐 Admin

A private administrative area can be used to manage portfolio content such as:

- Projects
- Posts
- Testimonials
- Contact submissions

---

# 🎨 Design & User Experience

The portfolio follows a clean, professional and editorial visual style.

### Design principles

- Light/white theme
- Strong typography
- Clean layouts
- Consistent spacing
- Responsive components
- Minimal visual clutter
- Purposeful animations
- Professional presentation

The goal is to make the website feel modern and interactive without making the interface distracting or difficult to use.

---

# 🎬 Motion & Animation

Motion is an important part of the portfolio experience.

The project uses:

- Framer Motion
- Lenis
- GSAP
- GSAP ScrollTrigger

### Animation features

- Scroll reveal animations
- Staggered content
- Text reveal effects
- Magnetic interactions
- Hover animations
- Image parallax
- Page transitions
- Marquee animations
- Count-up effects
- Scroll-based interactions

Animations are designed to support the content and maintain a professional experience.

---

# ♿ Accessibility

Accessibility is considered throughout the application.

The portfolio supports:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible controls
- Image alternative text
- Responsive layouts
- Reduced-motion preferences

Non-essential animations should be reduced or disabled when the user prefers reduced motion.

---

# 📱 Responsive Design

The portfolio is designed to work across:

- Mobile devices
- Tablets
- Laptops
- Desktop computers
- Large desktop displays

The layout is designed to remain usable from approximately `360px` wide and above.

---

# 🏗️ Architecture

The application consists of two main parts:

```text
┌─────────────────────────────────────┐
│             Portfolio               │
├─────────────────┬───────────────────┤
│    Frontend     │      Backend      │
│                 │                   │
│    Next.js      │     Express.js    │
│    React        │     TypeScript    │
│    TypeScript   │     MongoDB       │
│    Tailwind     │                   │
│    Motion       │     REST API      │
└─────────────────┴───────────────────┘
