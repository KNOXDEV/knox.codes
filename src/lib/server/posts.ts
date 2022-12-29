import { getSlugFromPath } from '$lib/posts';
import type { PostMetadata } from '$lib/posts';
import parseISO from 'date-fns/parseISO';

const modules = await import.meta.glob(`$lib/posts/*.svx`);

const metadatas = await Promise.all(
	Object.entries(modules).map(async ([path, resolver]) => {
		const { metadata } = (await resolver()) as { metadata: { [key: string]: string } };
		return {
			slug: getSlugFromPath(path),
			...metadata,
			date: parseISO(metadata.date)
		};
	})
);

export function getAllPostMetadata(): PostMetadata[] {
	return metadatas as unknown as PostMetadata[];
}
