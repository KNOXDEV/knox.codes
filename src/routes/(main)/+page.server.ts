import type { PageServerLoad } from './$types';
import { getAllPostMetadata } from '$lib/server/posts';

export const load: PageServerLoad = () => {
	return {
		articles: getAllPostMetadata()
	};
};
