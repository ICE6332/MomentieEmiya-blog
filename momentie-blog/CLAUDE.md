# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (default: http://localhost:3000, may use alternative ports if 3000 is occupied)
- `npm run build` - Build production application (includes TypeScript type checking)
- `npm start` - Start production server
- `npm run lint` - Run Biome linter checks
- `npm run lint:fix` - Run Biome linter with auto-fix
- `npm run format` - Auto-format code with Biome
- `npm run typecheck` - Run TypeScript type checking manually

## Project Architecture

### Core Animation Landing Page
This is a minimalist blog landing page with sophisticated GSAP animations following a specific design from Figma (node-id: 37:47).

**Layout Structure (Figma-based):**
- **Frame 2 (Top Section)**: Height 297px - Contains animated MomentieEmiya logo
- **Frame 3 (Bottom Section)**: Height 727px - Contains Yumi signature and illustration

### Component Architecture

**Main Components** (`src/components/`)
- `MomentieLogo.tsx` - SVG logo component with `forwardRef<SVGSVGElement>` for GSAP animation control
- `YumiSignature.tsx` - Signature component with Alex Brush font (loaded directly in component)
- `YumiIllustration.tsx` - Water-ink style illustration component

**Custom Hooks** (`src/hooks/`)
- `useIntroAnimation.ts` - Master animation controller using GSAP
  - Client-side hydration safety with `isClient` state
  - Returns cleanup function via `ctx.revert()`
  - Process safety checks for console.log statements

**Page Structure** (`src/app/`)
- `page.tsx` - Main landing page composing all components
- `layout.tsx` - Root layout with font configurations and interaction disabling scripts
- `globals.css` - Tailwind v4 with custom theme variables

### Animation Timeline

Synchronized animation sequence managed by `useIntroAnimation`:

1. **Logo Drawing** (0-2.1s): SVG path stroke animation with staggered letter drawing
2. **Logo Filling** (2.1-3s): Path fill transition to solid colors
3. **Logo Movement** (3-4.2s): Reposition to top=120px (manually adjusted for visual balance)
4. **Yumi + Illustration** (4.5-5.5s): Simultaneous 1-second water-ink effect
   - Text: blur(15px) → blur(0), scale(1.2) → scale(1), center-outward reveal
   - Illustration: blur(3px) → blur(0), scale(0.95) → scale(1)

### Font System

**Google Fonts (via next/font/google):**
- Geist Sans/Mono - System fonts
- IBM Plex Mono - Monospace text

**Local Fonts (via next/font/local):**
- `Waterfall-Regular.ttf` - MomentieEmiya logo text
- `AlexBrush-Regular.ttf` - Yumi signature (loaded in component to ensure proper rendering)

Font files located in `src/app/fonts/`

### Interaction Blocking

The layout includes client-side scripts that disable:
- Right-click context menu
- Text selection
- Drag operations
- Keyboard shortcuts (F12, Ctrl+U/S/A/C/V/X)

CSS also enforces `pointer-events: none` and `-webkit-user-select: none` globally.

### Code Quality Configuration

**Biome Configuration:**
- Formatter: 2 spaces indentation
- Linter: Recommended rules + Next.js/React specific rules
- Auto import organization enabled
- Ignores: node_modules, .next, dist, build

**TypeScript:**
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Target: ES2017
- Module: ESNext with bundler resolution

### Critical Implementation Details

1. **Font Loading Issue**: Alex Brush font must be loaded directly in `YumiSignature` component using `localFont()` - loading via layout.tsx CSS variables has proven unreliable

2. **Animation Refs**: All animated components use `forwardRef` pattern for GSAP control

3. **Hydration Safety**: Animation hook includes `isClient` check to prevent SSR/hydration mismatches

4. **Position Fine-tuning**: Logo final position (top: 120px) was manually adjusted from calculated value for optimal visual balance