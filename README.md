# knox.codes

My personal blog, originally written with Gatsby's static site generator,
using a theme called [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen/).

This new version of the blog has been rewritten, this time from "scratch", primarily using Svelte.
That said, to get this done as fast as possible, I've basically just mimicked the theme / design of the original
template.

**Final time-to-implement**: 14 hours, 45 minutes start-to-finish.

## technologies

* [SvelteKit](https://kit.svelte.dev/) - frontend and backend metaframework.
* [TypeScript](https://www.typescriptlang.org/) - it's 2022.
* [TailwindCSS](https://tailwindcss.com/) - atomic css framework for brevity.
* [MDsveX](https://github.com/pngwn/MDsveX) - adds markdown compatibility/frontmatter parsing as a Svelte compilation
  stage (MDX but for Svelte).
  Makes it so I can write my blog in mostly markdown and not go insane.
* [Shiki](https://github.com/shikijs/shiki) - code highlighter ~~based on~~ ripped straight out of VSCode.
  Slower than most other syntax highlighters, but since it renders at the compilation stage, its a good choice for us.
* [Vercel](https://vercel.com/) - free "Jamstack" deployment platform.

## features

1. Hybrid SSR/CSR that comes with Svelte.
2. SEO-friendly `meta` tags and automatically generating `/sitemap.xml`.
3. Automatically generating rss feed at `/rss.xml`.
4. Pagination of articles.
5. Generated browsing of articles by tags and categories.
6. Graceful 404 and error pages.
7. Themeable code-highlighting using Shiki, along with homebrew line numbers and line highlighting.

### todo

Mostly for my personal notes.

- [ ] rss feed html content for readers.
- [ ] pagination for tags and categories pages.
- [ ] line numbers and line highlighting for Shiki (half done).
- [ ] other pages for project / technology showcases (basically copy Matei).
- [ ] ~~service worker bitcoin miner~~