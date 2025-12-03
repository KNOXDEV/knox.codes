# knox.codes

My personal blog, originally written with Gatsby's static site generator,
using a theme called [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen/).

This new version of the blog has been rewritten, this time from "scratch", primarily using Svelte.
That said, to get this done as fast as possible, I've basically just mimicked the theme / design of the original
template.

**Final time-to-implement**: 14 hours, 45 minutes start-to-finish.

## how it works

Just add a markdown blog article into the [`src/lib/posts`](src/lib/posts) folder.
They will automatically be precompiled to Svelte components and rendered on the site.

Metadata supplied in the so-called "frontmatter" of the markdown will be used to
categorize and tag the articles, which can then be used to filter articles on the site.

Weirdly **I will accept pull requests on this blog** if somebody wants to post something.

## technologies

- [SvelteKit](https://kit.svelte.dev/) - frontend and backend metaframework.
- [TypeScript](https://www.typescriptlang.org/) - it's 2022.
- [TailwindCSS](https://tailwindcss.com/) - atomic css framework for brevity.
- [MDsveX](https://github.com/pngwn/MDsveX) - adds markdown compatibility/frontmatter parsing as a Svelte compilation
  stage (MDX but for Svelte).
  Makes it so I can write my blog in mostly markdown and not go insane.
- [Shiki](https://github.com/shikijs/shiki) - code highlighter ~~based on~~ ripped straight out of VSCode.
  Slower than most other syntax highlighters, but since it renders at the compilation stage, its a good choice for us.
- [Vercel](https://vercel.com/) - free "Jamstack" deployment platform.

## features

1. Hybrid SSR/CSR that comes with Svelte.
2. Write blog articles in markdown with code, latex, and even full Svelte components embedded.
3. SEO-friendly `meta` tags and automatically generating `/sitemap.xml`.
4. Automatically generating rss feed at `/rss.xml`.
5. Pagination of articles.
6. Generated browsing of articles by tags and categories.
7. Graceful 404 and error pages.
8. Themeable code-highlighting using Shiki, along with homebrew line numbers and line highlighting.
9. New "Projects" page with tagged filtering and supporting Markdown components.

### todo

Mostly for my personal notes.

- [ ] rss feed html content for readers.
- [ ] pagination for tags and categories pages.
- [ ] line numbers and line highlighting for Shiki (half done).
- [x] other pages for project / technology showcases (basically copy Matei).
- [ ] ~~service worker bitcoin miner~~
