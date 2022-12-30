import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';

const articles = getAllPostMetadata();

export const load: PageServerLoad = () => {
	return {
		articles: articles.slice(0, 4),
		nextLink: articles.length > 4 && '/page/1'
	};
};
