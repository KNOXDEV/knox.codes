import type { PageServerLoad } from './$types';

const modules = await import.meta.glob(`$lib/posts/*.svx`);
const articles = await Promise.all(Object.values(modules).map((mod) => mod()));

const articleMetadata = articles.map((article) => article.metadata);

export const load: PageServerLoad = () => {
	return {
		articles: articleMetadata
	};
};
