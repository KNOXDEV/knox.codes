import type { PageLoad } from './$types';
import { getAllVideos } from '$lib/videos';

export const load: PageLoad = async () => {
	const videos = await getAllVideos();
	return {
		videos,
		seo: {
			title: 'Videos'
		}
	};
};
