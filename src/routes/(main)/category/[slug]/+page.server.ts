import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';
import { getSlugFromTag } from '$lib/posts';

const articles = getAllPostMetadata();

export const load: PageServerLoad = ({ params }) => {
	const articlesInCategory = articles.filter(
		(article) => getSlugFromTag(article.category) === params.slug
	);

	const category = articlesInCategory[0].category;

	return {
		category,
		articles: articlesInCategory
	};
};
