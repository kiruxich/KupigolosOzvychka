<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project data sourcing

- For film titles, descriptions, cast, dubbing credits, actor names, audio links, and other editorial data, use only information published on `kupigolos.ru` and its official subdomains.
- Do not use search engines, TMDB, IMDb, Wikipedia, or other external sources as data sources for page content. If the КупиГолос source does not contain a fact, leave it empty or mark it as unavailable instead of guessing.
- External image hosts are allowed only for photographs, posters, and film stills. This exception does not apply to textual metadata or credits.
