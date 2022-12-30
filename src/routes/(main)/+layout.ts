import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const nav = [
		{ path: '/', title: 'Articles' },
		{ path: '/about', title: 'About me' },
		{ path: '/videos', title: 'Videos' }
	];

	return {
		nav
	};
};
