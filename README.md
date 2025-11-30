# AOI Creation - Single Page Demo

Minimal Vite + React + TypeScript application demonstrating:
- Leaflet map with an external WMS layer (WMS NRW DOP)
- Tailwind CSS for styling
- Playwright for tests

## Quick start

1. Install dependencies:
```
npm install
```

2. Run dev server:
```
npm run dev
```

Open http://localhost:5173

## Playwright tests

Run:
```
npx playwright test
```

Two simple tests are included that verify the homepage loads and the map container exists.

## Map library choice

Selected: **Leaflet (via react-leaflet)**.
Reasons:
- Lightweight and mature with simple WMS support.
- Straightforward integration for drawing tools and thousands of vector features (via marker clustering and WebGL-based layers).
- Alternatives: MapLibre GL (better for vector tiles/GPU rendering), OpenLayers (more feature-rich but heavier).

## Architecture & notes

- Simple component structure: `App` and `MapView`.
- Client-only state (React useState + simple DOM checkbox).
- Performance considerations: for thousands of features use clustering, WebGL layers (eg. Leaflet.glify or switching to MapLibre/Deck.gl), server-side tiling/vector tiles.

## What is included
- Source code (src/)
- Playwright tests (playwright/)
- Basic README and config files

## Time spent
Approximate: 10-11 hours to scaffold a minimal working demo and tests.

