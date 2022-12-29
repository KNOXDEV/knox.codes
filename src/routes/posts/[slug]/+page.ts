import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const modules = await import.meta.glob(`$lib/posts/*.svx`);

// modules is a map of full filesystem paths to resolvers,
// but we want to be able to quickly index in with just the
// slug that the user provides as a path parameter
const postsBySlug = Object.fromEntries(
	Object.entries(modules).map(([path, resolver]) => {
		path = path.split(/[\\/]/).pop() ?? path;
		path = path.slice(0, path.lastIndexOf('.'));
		return [path, resolver];
	})
);

export const load: PageLoad = async ({ params }) => {
	const post = postsBySlug[params.slug] && (await postsBySlug[params.slug]());

	if (!post) {
		throw error(404);
	}

	return {
		post: post.default,
		metadata: post.metadata
	};
};
