import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';

const articles = getAllPostMetadata().filter((article) => !article.draft);
articles.sort((a, b) => b.date.valueOf() - a.date.valueOf());

export const load: PageServerLoad = () => {
	return {
		articles
	};
};
