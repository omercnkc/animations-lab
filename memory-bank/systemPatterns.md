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

## Design System & Color Tokens
- **Brand Blue**: Primary `#2196F3`, Hover `#1976D2`, Dark `#0D47A1`, Light `#E3F2FD`, Border `#BBDEFB`
- **Neutrals & Surfaces**: Main Canvas `#FFFFFF`, Preview Grid `#FAFAFA`, Subtle Panel `#F1F1F1`, Soft Border `#E7E9EB`, Dark Banner `#282A35`
- **Typography Colors**: Headings `#282A35`, Descriptions `#4B5563`, Muted `#6B7280` / `#9CA3AF`
- **Theme Modes**: Dual support with `ThemeProvider` (Light & Dark with auto-persistence)
