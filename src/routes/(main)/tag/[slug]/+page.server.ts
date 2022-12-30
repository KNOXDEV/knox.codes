import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';
import { getSlugFromTag } from '$lib/posts';

const articles = getAllPostMetadata();

export const load: PageServerLoad = ({ params }) => {
	const articlesWithTag = articles.filter((article) =>
		article.tags.map(getSlugFromTag).includes(params.slug)
	);

	const tag = articlesWithTag
		.flatMap((article) => article.tags)
		.find((tag) => getSlugFromTag(tag) === params.slug);

	return {
		tag,
		articles: articlesWithTag,
		seo: {
			title: tag,
			description: `Articles with the ${tag} tag.`
		}
	};
};
