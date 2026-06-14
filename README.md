# Aadarsh Vision Micro Finance Foundation

A modern, responsive marketing website for Aadarsh Vision Micro Finance Foundation, built with **React 18 + TypeScript + Vite**, styled with **Tailwind CSS**, animated with **Framer Motion**, and routed with **React Router**.

## Getting Started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173` by default.

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/              # Logo and static images
├── components/          # Reusable UI building blocks
│   ├── sections/         # Page-section components (Hero, Services, etc.)
│   ├── Navbar.tsx         # Sticky responsive navigation
│   ├── Footer.tsx         # Site footer
│   ├── PageHero.tsx       # Inner-page banner
│   ├── GrowthArc.tsx      # Signature animated arc motif (from the logo)
│   ├── CountUp.tsx        # Animated number counter for stats
│   ├── DynamicIcon.tsx    # Maps icon name strings (from JSON) to lucide icons
│   ├── AnimatedSection.tsx# Scroll-reveal wrapper (Framer Motion)
│   └── ScrollToTop.tsx    # Resets scroll position on route change
├── data/                 # All content as JSON (edit these to update copy)
│   ├── site.json          # Org info, nav, hero, contact, footer
│   ├── about.json          # Mission, vision, values
│   ├── services.json       # Services offered
│   ├── whyChooseUs.json    # "Why choose us" reasons
│   ├── impact.json         # Impact stats + success stories
│   └── loanProcess.json    # Loan application steps + form options
├── pages/                # Routed page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Impact.tsx
│   ├── LoanProcess.tsx     # Includes the loan application form
│   ├── Contact.tsx         # Includes contact form + Google Maps embed
│   ├── PrivacyPolicy.tsx
│   └── NotFound.tsx
├── types/data.ts         # TypeScript interfaces matching the JSON shape
├── App.tsx               # Router configuration + layout shell
├── main.tsx              # App entry point
└── index.css             # Tailwind directives + design system utilities
```

## Routing

All internal navigation uses `react-router-dom`:

| Route             | Page             |
|-------------------|------------------|
| `/`               | Home             |
| `/about`          | About Us         |
| `/services`       | Our Services     |
| `/impact`         | Impact & Stories |
| `/loan-process`   | Loan Application |
| `/contact`        | Contact Us       |
| `/privacy-policy` | Privacy Policy   |
| `*`               | 404 Not Found    |

## Content Management

All copy, stats, services, and contact details live in `src/data/*.json`. To update site content (e.g. phone numbers, addresses, services, testimonials, impact numbers), edit the relevant JSON file — no component code changes required. TypeScript types in `src/types/data.ts` keep the shape consistent.

To update the Google Map, replace `mapEmbedUrl` in `site.json` with an embed URL for your actual office address (Google Maps → Share → Embed a map → copy the `src` URL).

## Design System

- **Colors**: Navy (`#1B2A4A`), Forest Green (`#2E7D32`), Gold (`#E8A93B`), Cream (`#F7F5F0`) — derived from the brand logo.
- **Typography**: Sora (display/headings), Inter (body/UI).
- **Signature element**: `GrowthArc` — an animated arc motif echoing the golden arc in the logo, used as a section divider, decorative backdrop, and progress indicator in the loan process timeline.
- **Motion**: Scroll-triggered fade/slide reveals via `AnimatedSection` and Framer Motion `whileInView`; respects `prefers-reduced-motion`.

## Accessibility

- Visible focus states (`:focus-visible`) on all interactive elements.
- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Form fields have associated labels, `aria-invalid`, and `aria-describedby` for errors.
- Reduced-motion media query disables animations for users who prefer it.

## Forms

Both the **Loan Application** (`/loan-process`) and **Contact** (`/contact`) forms include client-side validation and a success confirmation state. They currently simulate submission locally — connect them to your backend/API or a form service (e.g. Formspree, your CRM endpoint) inside `handleSubmit` in each page.
