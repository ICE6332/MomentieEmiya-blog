# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (runs on http://localhost:3000)
- `npm run build` - Build production app
- `npm start` - Start production server
- `npm run lint` - Run Biome linter checks
- `npm run format` - Format code with Biome

### Development Server
The development server runs on http://localhost:3000 by default.

## Project Architecture

### Framework & Structure
- **Next.js 15.5.2** with App Router architecture
- **App Directory**: `src/app/` contains pages, layouts, and route handlers
- **TypeScript**: Fully configured with strict mode enabled
- **Path Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Animation**: GSAP integration with React hooks for advanced animations

### Key Directories
```
src/app/          # App Router pages and layouts
├── layout.tsx    # Root layout with font configuration
├── page.tsx      # Home page component with GSAP animations
├── globals.css   # Global styles and CSS variables
└── fonts/        # Local font files (AlexBrush-Regular.ttf, Waterfall-Regular.ttf)
public/           # Static assets (images, icons)
```

### Styling System
- **Tailwind CSS v4** with PostCSS integration
- **Custom CSS Variables**: Defined in `globals.css` for theming
- **Color Scheme**: Custom brand colors (`--color-momentie-bg: #f0eee6`, `--color-momentie-text: #000000`)
- **Fonts**: 
  - Google Fonts: Geist Sans, Geist Mono, IBM Plex Mono
  - Local Fonts: Waterfall-Regular.ttf, AlexBrush-Regular.ttf (in `src/app/fonts/`)
- **Font Loading**: Optimized with `next/font` for performance

### Code Quality Tools
- **Biome** (NOT ESLint/Prettier) for linting and formatting
- Configured with Next.js and React recommended rules
- Import organization enabled
- 2-space indentation enforced

## Configuration Details

### Build System
- **Next.js default build system** (not using Turbopack)
- Standard webpack-based builds for optimal compatibility
- Production optimizations enabled by default

### TypeScript Configuration
- Strict mode enabled with ES2017 target
- Next.js TypeScript plugin configured
- Module resolution set to "bundler" for optimal compatibility

### Biome Configuration
Key settings in `biome.json`:
- Git integration enabled with ignore file support
- Custom ignore patterns for build directories
- Next.js and React domain rules enabled
- Unknown CSS at-rules disabled for Tailwind compatibility

## Development Workflow

### Starting Development
1. Run `npm run dev` to start development server with hot reload
2. Edit `src/app/page.tsx` to modify the home page
3. Global styles are in `src/app/globals.css`
4. Use `@/` prefix for imports from the src directory

### Animation Development
- GSAP is configured with React hooks (`useGSAP`)
- Client-side only animations with hydration check (`useEffect` with `isClient` state)
- Path animations use `strokeDasharray` and `strokeDashoffset` for drawing effects
- Animation timing configured with staggered delays for sequential effects

### Code Formatting
- Code is automatically formatted using Biome
- Run `npm run format` to format all files
- Import organization happens automatically

### Building for Production
- `npm run build` creates optimized production build
- `npm start` serves the production build locally
- Static assets are served from the `public/` directory