import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import { getAllPostMetadata } from '$lib/server/posts';
import { error } from '@sveltejs/kit';

const articles = getAllPostMetadata();

export const load: PageServerLoad = ({ params }) => {
	const index = parseInt(params.index);

	if (!index || isNaN(index)) error(404);

	const sliceIndex = index * 4;
	if (sliceIndex >= articles.length) error(400);

	const previousLink =
		sliceIndex - 4 <= 0
			? resolve('/')
			: resolve('/(main)/page/[index]', { index: String(index - 1) });
	const nextLink =
		sliceIndex + 4 >= articles.length
			? undefined
			: resolve('/(main)/page/[index]', { index: String(index + 1) });

	return {
		articles: articles.slice(sliceIndex, sliceIndex + 4),
		previousLink,
		nextLink
	};
};
