import type { PageLoad } from './$types';
import {getAllProjects} from "$lib/projects";

export const load: PageLoad = async () => {
	const projects = await getAllProjects();
	return {
		projects
	};
};
