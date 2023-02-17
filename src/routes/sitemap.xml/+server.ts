import { getAllPostMetadata } from '$lib/server/posts';
import { getSlugFromTag } from '$lib/posts';

function getXmlForPath(path: string): string {
	return `
	<url>
        <loc>https://knox.codes${path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>`.trim();
}

const metadata = getAllPostMetadata();
const pages = [...Array(Math.ceil(metadata.length / 4)).keys()].slice(1);
const slugs = metadata.map((md) => md.slug);
const tags = [...new Set(metadata.flatMap((md) => md.tags).map(getSlugFromTag))];
const categories = [...new Set(metadata.map((md) => getSlugFromTag(md.category)))];

export const GET = () => {
	return new Response(
		`
	<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${['/', '/videos', '/about', '/projects'].map(getXmlForPath).join('\n')}
      ${pages
				.map((pageNum) => `/page/${pageNum}`)
				.map(getXmlForPath)
				.join('\n')}
      ${slugs
				.map((slug) => `/posts/${slug}`)
				.map(getXmlForPath)
				.join('\n')}
      ${tags
				.map((tag) => `/tag/${tag}`)
				.map(getXmlForPath)
				.join('\n')}
      ${categories
				.map((cat) => `/category/${cat}`)
				.map(getXmlForPath)
				.join('\n')}
    </urlset>`.trim(),
		{
			headers: {
				'Cache-Control': 'max-age=0, s-maxage=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
};
