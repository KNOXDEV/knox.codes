import { getAllPostMetadata } from '$lib/server/posts';
import type { PostMetadata } from '$lib/posts';

function getXmlForPost(post: PostMetadata): string {
	return `
		<item>
          <title>${post.title}</title>
          <description>${post.description}</description>
          <link>https://knox.codes/posts/${post.slug}</link>
          <pubDate>${post.date}</pubDate>
        </item>`.trim();
}

const metadata = getAllPostMetadata();

export const GET = () => {
	return new Response(
		`
	<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
		<channel>
        	<title>knox.codes</title>
        	<link>https://knox.codes/</link>
        	<description>Nick Knox does some coding.</description>
        	${metadata.map(getXmlForPost).join('\n')}
      	</channel>
	</rss>`.trim(),
		{
			headers: {
				'Cache-Control': 'max-age=0, s-maxage=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
};
