import parseISO from 'date-fns/parseISO/index';
import type { SvelteComponent } from 'svelte';

export function getSlugFromPath(path: string): string {
	const basename = path.split(/[\\/]/).pop() ?? path;
	return basename.slice(0, basename.lastIndexOf('.'));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
	const modules = await import.meta.glob(`$lib/posts/*.svx`);
	const postsBySlug = Object.fromEntries(
		Object.entries(modules).map(([path, resolver]) => [getSlugFromPath(path), resolver])
	);

	if (!postsBySlug[slug]) return;

	const { default: component, metadata } = (await postsBySlug[slug]()) as {
		default: SvelteComponent;
		metadata: { [key: string]: string };
	};

	return {
		component,
		metadata: {
			...metadata,
			date: parseISO(metadata.date)
		}
	} as Post;
}

export function getSlugFromTag(tag: string) {
	return tag.toLowerCase().replaceAll(' ', '-');
}

export interface Post {
	component: SvelteComponent;
	metadata: PostMetadata;
}

export interface PostMetadata {
	title: string;
	description: string;
	socialImage: string;
	category: string;
	draft: boolean;

	slug: string;

	tags: string[];
	date: Date;
}
