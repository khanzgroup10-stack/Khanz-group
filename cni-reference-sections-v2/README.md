# CNI — Rebuilt Reference Sections (v2)

**This replaces the previous generic mockup.** The supplied video was used to match the **structure and interaction** of its second and third sections; brand copy comes from the supplied CNI website content.

## What is included

1. **Section 2 — Editorial divisions selector:** clean white background, thin header line, three-position number column, central circular image with pointer/diagonal line, short right-aligned title, bottom CTA. On desktop it stays pinned during native page scrolling, progressing through the eight CNI divisions. The numbers are clickable. On mobile use the numbers or swipe the circular image.
2. **Section 3 — Immersive photographic grid:** edge-to-edge architectural background, thin 3x3 grid, understated text, lower-middle white active tile, hover and click interactions, accessible side panel. No generic metrics cards.

## Run locally

Open `index.html` directly in any modern browser or serve the folder with `python -m http.server 8080` and open `http://localhost:8080`.

## Important media notes

The source text links to official CNI division image URLs. The implementation tries those URLs first and uses illustrative Unsplash images if they cannot load. The circular image also has a locally bundled SVG fallback. The large architectural background similarly uses the official CNI real estate image with an illustrative Unsplash fallback. **Replace these images with approved local CNI assets before publishing**. No logo file was supplied in this upload, so the text in the navigation is a temporary plain wordmark, **not a redraw of the official logo**.

No site files, admin credentials or private hosting access were supplied. This is a standalone, working two-section **prototype**, not an update to your existing deployed website.

## Source of copy

The eight division titles and service descriptions were adapted from the uploaded CNI website content. Exact investment-return claims and guarantees were intentionally omitted from the visual prototype.

## Next.js integration

Port the two `<section>` elements into your existing `app/page.tsx` after your current hero, or copy the markup into two client components (the interactive code in `script.js` must run on the client). The stylesheet is regular CSS with no framework requirement. If your Next.js project files are provided, these sections can be integrated directly with its existing navigation, font, animations and approved CNI logo rather than approximating them.
