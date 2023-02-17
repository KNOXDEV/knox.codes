import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';
import { error } from '@sveltejs/kit';

const articles = getAllPostMetadata();

export const load: PageServerLoad = ({ params }) => {
	const index = parseInt(params.index);

	if (!index || isNaN(index)) throw error(404);

	const sliceIndex = index * 4;
	if (sliceIndex >= articles.length) throw error(400);

	const previousLink = sliceIndex - 4 <= 0 ? '/' : `/page/${index - 1}`;
	const nextLink = sliceIndex + 4 >= articles.length ? '' : `/page/${index + 1}`;

	return {
		articles: articles.slice(sliceIndex, sliceIndex + 4),
		previousLink,
		nextLink
	};
};
