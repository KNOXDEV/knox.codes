import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/posts';

export const load: PageLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404);
	}

	return {
		post
	};
};
