# Copilot Instructions for Arjun's Portfolio

## Project Overview
This is a React-based personal portfolio showcasing academic achievements, technical projects, and work experience. The app uses client-side routing with a single-page architecture driven by state management (`currentPage` and `selectedProject`).

**Tech Stack:**
- React 18.2 with Hooks (useState, useEffect, useRef)
- Tailwind CSS 3.3 for styling (dark theme with gray-900/gray-800 palette)
- No external routing library (manual state-based navigation)
- Embeds Sketchfab models and Google Drive PDFs/images

## Architecture

### Single Page State Machine
[App.js](App.js) is a monolithic component (~1000 lines) implementing a state-based navigation pattern:
- `currentPage`: Controls main view (home, writing, projects, internship, rocketry, contact, about)
- `selectedProject`: Tracks which item is being viewed in detail pages
- Detail views are rendered conditionally based on both states
- Each main page component receives `onSelectProject` callback to trigger detail view

### Key Patterns

**Navigation Flow:**
1. User clicks nav button → `setCurrentPage()` updates state
2. Detail card clicked → `setSelectedProject()` + `setCurrentPage(pageType + "-detail")`
3. Back button → resets both states to parent page
4. Nav brand click → always returns to home

**Content Arrays:**
- Static data objects (writingProjects, projects within each Page function)
- Each project has: id, title, category, thumbnail (emoji), description, fullDescription
- Optional fields: pdfs[], show3DViewer, models3D[], showImageGallery, images[]

**Styling Conventions:**
- Tailwind classes only (no external CSS except styles.css base reset)
- Dark theme: `bg-black`, `bg-gray-900`, `bg-gray-800`, `text-white`, `text-gray-300`, `text-gray-400`
- Hover states: `hover:border-white`, `hover:text-gray-300`, `hover:-translate-y-2`
- Animated entrance: `transition-all duration-700`, `opacity-0/100`, `translate-*`
- Grid layouts: `grid-cols-1 md:grid-cols-2 gap-8`

## Developer Workflows

### Build & Run
```bash
npm start      # Start dev server (port 3000)
npm build      # Production build
npm test       # Run tests (jsdom)
```

### Adding New Pages
1. Create component function (e.g., `function NewPage({ onNavigate })`)
2. Add to nav buttons in main Portfolio component
3. Add conditional render in main div
4. Add state case: `currentPage === "newpage"` → render component

### Adding Portfolio Items
1. Add object to content array (writingProjects, projects, models3D, etc.)
2. Required fields: id, title, category, thumbnail, description, fullDescription
3. Use [IntersectionObserver in ProjectDetailPage](App.js#L706-L725) for lazy animation on scroll
4. Support media types: PDFs (Google Drive links), 3D models (Sketchfab embeds), images/videos

## Critical Implementation Details

**ProjectDetailPage Component:**
- Uses IntersectionObserver to trigger entrance animations on scroll
- Conditionally renders sections: overview, 3D models, image gallery, PDF files
- Handles video/image differentiation in ImageGallery (video type shows play icon)
- Modal image viewer on click with keyboard close (✕ button)

**External Embeds:**
- Sketchfab 3D models: `<iframe src="sketchfab.com/models/[id]/embed">`
- Google Drive thumbnails: `https://drive.google.com/thumbnail?id=[fileId]&sz=w1000`
- Google Drive PDFs/videos: Preview links work in iframes; external share links open in new tabs

**Session State:**
- `window.sessionAnimationShown` flag prevents reanimation on page reload (showHero logic)
- Animation complete flag in state (currently always true after mount)

## Project Structure Notes
- Single file monolith: All components in App.js (HomePage, WritingPage, ProjectsPage, etc.)
- Static content embedded in component files (no CMS or database)
- No context API or Redux (prop drilling via callbacks)
- Minimal CSS: Only base typography in styles.css; all layout in Tailwind
- No routing library: Manual state synchronization

## Common Tasks

**Styling Updates:**
- Use Tailwind utility classes directly in className
- Dark theme palette: Add grays to existing gray-900/gray-800
- Transitions: Add `transition-all duration-[time]` before opacity/transform changes

**New Content Sections:**
- Add data object with required fields
- Map over array in grid (see WritingPage pattern)
- Link to detail view via onSelectProject callback
- Detail rendering handles media type based on object properties

**Embed Troubleshooting:**
- Sketchfab: Verify embed URL matches model ID in URL
- Google Drive: Use thumbnail endpoint for previews; share links for PDFs
- Iframes: Ensure allowFullScreen and allow="autoplay" attributes present
