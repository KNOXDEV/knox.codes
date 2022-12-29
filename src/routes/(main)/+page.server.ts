import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';

const articles = getAllPostMetadata();

export const load: PageServerLoad = () => {
	return {
		articles
	};
};
