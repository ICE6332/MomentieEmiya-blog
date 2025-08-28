# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (default: http://localhost:3000)
- `npm run build` - Build production application (includes TypeScript type checking)
- `npm start` - Start production server
- `npm run lint` - Run Biome linter checks
- `npm run format` - Auto-format code with Biome
- `npx tsc --noEmit` - Run TypeScript type checking manually

## Project Architecture

### Component Architecture
The application follows a modular component structure with separation of concerns:

**Main Components** (`src/components/`)
- `MomentieLogo.tsx` - SVG logo component with `forwardRef<SVGSVGElement>` for animation control
- `WelcomeMessage.tsx` - Welcome text component with IBM Plex Mono font styling
- `YumiSignature.tsx` - Artistic signature component using Alex Brush font
- `YumiIllustration.tsx` - Water-ink style illustration component (新增)

**Custom Hooks** (`src/hooks/`)
- `useIntroAnimation.ts` - Encapsulates all GSAP animation logic with timeline management
  - Handles client-side hydration with `isClient` state
  - Manages complex animation sequences: SVG path drawing, text typewriter effects, water-ink transitions
  - Returns timeline reference for external control

**Page Structure** (`src/app/`)
- `page.tsx` - Main home page that composes components and uses animation hook
- `layout.tsx` - Root layout with font configurations (Geist, IBM Plex Mono, Waterfall, Alex Brush)
- `globals.css` - Global styles with CSS variables for theming

### Animation System
The application uses GSAP for complex animation sequences with precise timeline control:

**Animation Phases:**
1. **Logo Drawing** (0-2s): SVG path stroke animation for letter outlines
2. **Logo Filling** (2-3s): Path fill transition to solid colors
3. **Logo Transform** (3-4s): Scale down and reposition to top-left corner
4. **Welcome Text** (4-6s): Typewriter effect for welcome message with cursor blink
5. **Signature Fade** (6-7s): Water-ink fade effect for Yumi signature
6. **Illustration** (7-8s): Final illustration fade-in (if present)

All animations are managed through a master GSAP timeline in `useIntroAnimation` hook with:
- Staggered delays for natural flow
- Easing functions for smooth transitions
- Auto-cleanup on component unmount

### Styling Configuration
- **Tailwind CSS v4** with PostCSS
- **Custom Properties**: `--color-momentie-bg: #f0eee6`, `--color-momentie-text: #000000`
- **Font System**:
  - Google Fonts: Geist Sans/Mono, IBM Plex Mono
  - Local Fonts: Waterfall-Regular.ttf, AlexBrush-Regular.ttf
- **CSS Variables**: Used for dynamic theming and font references

### Code Quality
- **Biome** for linting and formatting (NOT ESLint/Prettier)
- **TypeScript** with strict mode and path aliases (`@/*` → `./src/*`)
- **Import Organization**: Automatically sorted with type imports first
- **Indentation**: 2 spaces enforced

## Key Technical Patterns

### ForwardRef Pattern
All visual components use `forwardRef` to expose DOM refs for animation control:
```typescript
export const ComponentName = forwardRef<HTMLDivElement, Props>(
  ({ className }, ref) => { /* ... */ }
);
ComponentName.displayName = "ComponentName";
```

### Client-Side Animation Safety
Animations check for client-side rendering before execution:
```typescript
const [isClient, setIsClient] = useState(false);
useEffect(() => { setIsClient(true); }, []);
useGSAP(() => {
  if (!isClient) return;
  // animation logic
}, { dependencies: [isClient] });
```

### GSAP Timeline Management
Single master timeline coordinates all animation phases with precise timing:
- Staggered letter animations with calculated delays
- Phase transitions using timeline position parameters
- Cleanup handled automatically by useGSAP hook