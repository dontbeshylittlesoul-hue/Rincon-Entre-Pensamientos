# Agent Context — Rincón entre Pensamientos

## Architecture

Fully static: one HTML file (`index.html`), one CSS file (`style.css`), one JS file (`main.js`). No framework, no bundler, no dependencies beyond Google Fonts loaded via CDN.

## Key directories / files

```
index.html   — full page markup, five sections
style.css    — all styles, CSS variables, animations
main.js      — IntersectionObserver reveals + custom audio player
ambiente.mp3 — placeholder audio (to be replaced by the user)
```

## Sections

1. **Hero** — full-viewport intro with title, subtitle, CTA
2. **Lectura** — five scrollable reflective text blocks with numbered markers
3. **Audio** — custom `<audio>` player UI over a native `<audio>` element
4. **Ebook** — book illustration + description + PDF download button
5. **Cierre** — closing thought and back-to-top link

## Design conventions

- CSS custom properties (`:root`) drive the full palette — edit `--amber`, `--bg-*`, `--text-*` to retheme.
- Scroll-triggered fade-ins via `.reveal` class + IntersectionObserver (no library).
- Animations use only `opacity` and `transform` — no layout-thrashing properties.
- `bg-noise` is a fixed SVG overlay; never apply noise/filter to scrolling containers.
- Mobile breakpoint at 600 px: single-column ebook layout, volume control hidden.

## Audio replacement

The `<source src="ambiente.mp3">` tag inside `#ambiente` section is the only place to update when the user provides their own audio file.
