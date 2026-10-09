# Active Context

## Current Work Focus
- Decision confirmed: Proceeding with **Next.js (App Router)** as decided by the user.
- Kicking off **Phase 1: Core Architecture & Infrastructure Setup**:
  - Setting up Next.js + TypeScript + Tailwind CSS project structure.
  - Designing UI design system & theme (Dark mode default).
  - Designing the Component Registry Schema for animation items.

## Recent Changes
- Initial roadmap documented in `roadpMap.md`.
- GitHub repository configured & active: `https://github.com/omercnkc/animations-lab`.
- Next.js 16 (App Router) + React 19 + Tailwind CSS v4 running smoothly.
- Implemented Phase 1, Phase 2, Phase 3, and Phase 4 features.
- Added full **Light Mode and Dark Mode support** with `ThemeProvider`, animated Sun/Moon toggle button, localStorage persistence, and adaptive styles across all pages and cards.
- Official flask emblem configured as app favicon, navbar brand icon, and README banner.
- Updated Navbar brand logo with **dual Light & Dark mode support**:
  - Light mode: Uses `brand-light.png` cropped from `icon-light.jpg`.
  - Dark mode: Uses `brand-dark.png` cropped from `icon-dark.jpg`.
  - Removed duplicate HTML text (`AnimationLab` / `Web & Mobile Playground`) and enlarged the brand logo for a cleaner, high-end agency aesthetic.
- Added **SmartLockInput** (`smart-lock-input` in `inputs` category):
  - Web: Interactive animated padlock with realistic shackle pivot rotation, shake on error, dual-mode authentication (Login / Register), and dynamic 4-rule password strength indicator.
  - Mobile: React Native Reanimated v3 equivalent with spring physics and sequence shakes.
  - Interactive mini preview added to `ComponentCard` on catalog page.
  - Verified static generation and Turbopack production build with 100% success.

## Next Steps
- Continue expanding animation items across loaders, transitions, and gesture components.
- Prepare deployment configs for Vercel / Cloudflare.
