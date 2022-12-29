import parseISO from 'date-fns/parseISO';
import type { SvelteComponent } from 'svelte';

const modules = await import.meta.glob(`$lib/posts/*.svx`);

// modules is a map of full filesystem paths to resolvers,
// but we want to be able to quickly index in with just the
// slug that the user provides as a path parameter
const postsBySlug = Object.fromEntries(
	Object.entries(modules).map(([path, resolver]) => [getSlugFromPath(path), resolver])
);

export function getSlugFromPath(path: string): string {
	const basename = path.split(/[\\/]/).pop() ?? path;
	return basename.slice(0, basename.lastIndexOf('.'));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
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

export interface Post {
	component: SvelteComponent;
	metadata: PostMetadata;
}

export interface PostMetadata {
	title: string;
	description: string;
	category: string;
	draft: boolean;
	date: Date;
}
