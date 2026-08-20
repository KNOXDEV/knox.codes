import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import { getAllPostMetadata } from '$lib/server/posts';

const articles = getAllPostMetadata();

export const load: PageServerLoad = () => {
	return {
		articles: articles.slice(0, 4),
		nextLink: articles.length > 4 ? resolve('/(main)/page/[index]', { index: '1' }) : undefined
	};
};
