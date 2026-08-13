# Niraj Kushwaha — Full-Stack Developer Portfolio

> A modern, responsive and motion-led personal portfolio showcasing my work as a Full-Stack Developer and aspiring AI Engineer.

**Live Website:** Coming Soon
**Backend API:** Coming Soon
**API Documentation:** Coming Soon

---

## 🚀 About the Project

This repository contains the source code for my personal developer portfolio — designed not only as a resume website, but as a complete full-stack product.

The portfolio presents my skills, projects, education, experience and technical journey through a clean, professional interface with purposeful animations and responsive interactions.

The project is built around two main applications:

* **Frontend:** Next.js + TypeScript
* **Backend:** Express.js + TypeScript + MongoDB

The backend provides a lightweight content API and contact-management system, allowing portfolio content such as projects, posts and testimonials to be managed without modifying the frontend code.

A completely static version is also supported by hard-coding project content and using a form service for contact submissions.

---

## ✨ Key Features

### 🌐 Public Portfolio

* Animated landing page
* Hero section with personal introduction
* About section
* Skills and technology stack
* Featured projects
* Complete project showcase
* Individual project case studies
* Education and experience timeline
* Contact section
* Social and professional links
* Responsive design
* Mobile navigation
* SEO-ready pages

### 🎨 Modern UI & Motion

The portfolio uses a clean editorial white theme with a configurable accent color.

The motion system is built using reusable components and includes:

* Scroll-based reveals
* Text-mask animations
* Staggered content animations
* Magnetic buttons
* Infinite marquees
* Count-up statistics
* Image parallax
* Page transitions
* GSAP ScrollTrigger moments
* Hover interactions

Animations are intentionally restrained so the website feels professional rather than overly animated.

---

## ♿ Accessibility & Reduced Motion

Accessibility is treated as a core requirement rather than an optional feature.

The application supports:

* Keyboard navigation
* Visible focus states
* Semantic HTML
* Accessible form controls
* Image alt text
* Sufficient contrast
* Responsive layouts
* `prefers-reduced-motion`

When reduced motion is enabled, non-essential animations are disabled and the content remains fully usable as a static website.

The project requirements explicitly specify transform/opacity-based animation and graceful degradation for reduced-motion users.

---

**Technologies:**

`MERN Stack` `React Native`

## These four projects are defined as the portfolio's featured projects in the frontend specification and backend seed requirements.

# 🏗️ System Architecture

The project follows a frontend + API architecture.

```text
                         ┌──────────────────────┐
                         │       Visitor        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Next.js App      │
                         │   React + TypeScript │
                         └──────────┬───────────┘
                                    │
                             REST API Requests
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Express API       │
                         │    TypeScript        │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
                ┌─────────┐   ┌──────────┐   ┌───────────┐
                │ MongoDB │   │Cloudinary│   │  Nodemailer│
                └─────────┘   └──────────┘   └───────────┘
```

The backend follows a layered architecture:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

Controllers remain thin while business logic stays inside services.

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lenis
* GSAP
* React Hook Form
* Zod

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* Zod
* Nodemailer
* Multer
* Cloudinary

## Development & Deployment

* Git
* GitHub
* Vercel
* REST API
* Swagger / OpenAPI
* MongoDB
* Cloudinary

## The frontend specification calls for Next.js App Router, TypeScript, Tailwind, Framer Motion, Lenis and GSAP, while the backend specification uses Express + TypeScript with MongoDB and supporting services.

# 📁 Project Structure

```text
niraj-kushwaha-portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── app/
│   ├── hooks/
│   ├── lib/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── templates/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── ...
│
├── README.md
└── ...
```

The backend specification defines dedicated configuration, controllers, middleware, models, routes, services, utilities, validations and email templates.

---

# 📄 Portfolio Pages

## Public Routes

```text
/
├── /projects
├── /projects/[slug]
├── /about
├── /blog
├── /blog/[slug]
└── /contact
```

## Private Route

```text
/admin
```

The `/blog` functionality is optional, while `/admin` provides private content management.

---

# 🔐 Admin CMS

The backend provides a private administration system.

The administrator can:

* Sign in
* Manage projects
* Create projects
* Update projects
* Delete projects
* Manage posts
* Manage testimonials
* View contact submissions
* Update contact status
* Upload project images

Authentication uses JWT-based authorization.

Public users can read portfolio content but cannot modify it.

---

# 📡 API

All backend routes are mounted under:

```text
/api
```

### Health

```http
GET /api/health
```

### Authentication

```http
POST /api/auth/login
GET  /api/auth/me
```

### Projects

```http
GET    /api/projects
GET    /api/projects/:slug
POST   /api/projects
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

### Posts

```http
GET    /api/posts
GET    /api/posts/:slug
POST   /api/posts
PATCH  /api/posts/:id
DELETE /api/posts/:id
```

### Testimonials

```http
GET    /api/testimonials
POST   /api/testimonials
PATCH  /api/testimonials/:id
DELETE /api/testimonials/:id
```

### Contact

```http
POST  /api/contact
GET   /api/contact
PATCH /api/contact/:id
```

### API Documentation

```text
/api/docs
```

The backend build specification defines these content, contact and documentation endpoints and requires public reads with authenticated admin writes.

---

# 🗃️ Data Models

The main database entities are:

```text
User
Project
Post
Testimonial
ContactSubmission
```

### Project

```text
title
slug
summary
description
techTags[]
images[]
liveUrl
repoUrl
featured
order
```

### Post

```text
title
slug
excerpt
body
coverImage
publishedAt
```

### Testimonial

```text
author
role
quote
avatar
```

### ContactSubmission

```text
name
email
message
status
createdAt
```

---

# 📩 Contact System

The contact form includes:

* Name
* Email
* Message
* Validation
* Honeypot spam protection
* Rate limiting
* Database storage
* Email notification
* Animated success state

The backend stores contact submissions and sends them through Nodemailer.

---

# 🔎 SEO

The portfolio is designed with an SEO-first approach.

It includes:

* Page titles
* Meta descriptions
* Open Graph metadata
* Twitter cards
* Canonical URLs
* Sitemap
* Robots.txt
* Semantic HTML
* Optimized images
* Static rendering where appropriate

The SRS defines SEO and Core Web Vitals as mandatory non-functional requirements.

---

# ⚡ Performance

Performance considerations include:

* Next.js static rendering
* `next/image`
* Lazy loading
* Code splitting
* Lazy-loaded GSAP
* Transform/opacity animations
* Minimal JavaScript where possible
* Responsive images
* Core Web Vitals optimization

The goal is to make the portfolio visually impressive without sacrificing loading performance.

---

# 🔒 Security

Security considerations include:

* JWT authentication
* Server-side authorization
* Password hashing
* Environment variables
* CORS restrictions
* Helmet
* Zod validation
* Rate limiting
* Honeypot spam protection
* Secure API design

Sensitive credentials must never be committed to GitHub.

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend:

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

EMAIL_TO=
EMAIL_FROM=
```

Create a frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Never commit:

```text
.env
.env.local
.env.production
```

The backend specification identifies these environment variables for database, authentication, frontend CORS, Cloudinary and email configuration.

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/niraj-kushwaha-portfolio.git

cd niraj-kushwaha-portfolio
```

---

## 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## 3. Configure frontend environment

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 4. Start frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🔧 Backend Setup

Open another terminal:

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Configure the required environment variables.

Then run:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

# 🌱 Seed Database

After configuring MongoDB:

```bash
npm run seed
```

The seed process can create the admin account and initial portfolio projects.

The defined initial projects are:

```text
IRC Platform
Opportunity Radar
Free Fire Tournament Platform
Digital Khata
```

The backend specification requires the seed process to be idempotent.

---

# 🧪 Testing

Backend functionality can be tested using:

* Postman
* Insomnia
* REST Client
* Swagger

Important test flows:

```text
GET /api/health
GET /api/projects
POST /api/contact
POST /api/auth/login
GET /api/auth/me
```

Also verify:

* Contact messages are stored
* Contact emails are delivered
* Spam protection works
* Admin authentication works
* Projects can be created
* Projects can be updated
* Projects can be deleted
* Image uploads work

---

# 📱 Responsive Design

The website is designed to work from:

```text
360px mobile
      ↓
Tablet
      ↓
Laptop
      ↓
Desktop
      ↓
Large screens
```

The project requirement specifically states that the site must work without horizontal scrolling from 360px through large desktop displays.

---

# 🎯 Project Goals

This portfolio is built with several goals:

1. Present my professional identity.
2. Showcase real software projects.
3. Demonstrate full-stack development skills.
4. Demonstrate modern React/Next.js development.
5. Demonstrate API and database architecture.
6. Demonstrate AI-assisted development experience.
7. Demonstrate UI/UX and animation skills.
8. Provide a real contact system.
9. Provide an extensible content-management system.
10. Build a portfolio that can evolve as my career grows.

---

# 🧠 What This Project Demonstrates

This project demonstrates practical knowledge of:

```text
Frontend Development
        ↓
React / Next.js
        ↓
TypeScript
        ↓
UI / UX
        ↓
Animation Systems
        ↓
REST API Development
        ↓
Authentication
        ↓
MongoDB
        ↓
Cloud Storage
        ↓
Email Systems
        ↓
SEO
        ↓
Accessibility
        ↓
Performance Optimization
        ↓
Deployment
```

---

# 📈 Future Improvements

Potential future improvements include:

* AI-powered portfolio assistant
* AI project recommendation system
* Blog editor
* Advanced analytics
* Project search
* Project filtering
* Resume download tracking
* Visitor interaction analytics
* GitHub API integration
* Automated project synchronization
* More advanced admin dashboard
* Internationalization
* Nepali/English content support

---

# 👨‍💻 About Me

**Niraj Kushwaha**

Full-Stack Developer · AI Engineer in Progress

Kathmandu, Nepal

I enjoy building practical software products that solve real-world problems. My current focus is full-stack development, modern web technologies, AI-assisted development and eventually building intelligent software systems.

I'm particularly interested in building technology that can solve meaningful problems for students, merchants, businesses and communities in Nepal.


---

# 📄 License

This project is primarily a personal portfolio project.

The source code is available for learning and reference. Please do not copy the portfolio content, personal information, images, project descriptions or identity and present them as your own.

---

## ⭐ Acknowledgements

Built and designed by **Niraj Kushwaha**.

> Building useful software, one problem at a time.
