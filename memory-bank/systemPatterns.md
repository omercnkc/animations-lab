# System Patterns

## System Architecture
- **Framework**: Next.js (App Router, Server Components + Client Playground Components)
- **Directory Structure**:
  ```text
  ├── app/
  │   ├── (catalog)/[category]/[slug]/page.tsx   # Individual component playground page
  │   ├── layout.tsx                             # Global layout, fonts, nav
  │   ├── page.tsx                               # Showcase gallery home
  │   └── globals.css                            # Core tokens, dark theme & custom keyframes
  ├── components/
  │   ├── playground/                            # Sandpack (Web) & Expo Embed (Mobile)
  │   └── ui/                                    # Navbar, Card, Tabs, Search
  └── registry/                                  # Component schemas and code snippets
      ├── schema.ts                              # TypeScript schema for components
      └── items/                                 # Organized by category (buttons, toggles, etc.)
  ```

## Key Technical Decisions
- **Sandpack React** for Web Playground: Zero backend execution, runs in-browser worker bundler.
- **Expo Snack Embed** for Mobile Playground: Official iframe integration with QR code testing on real mobile devices.
- **Registry Schema**: Static typed registry to allow instant filtering, search, and dynamic routing without database overhead.
