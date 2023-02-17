import type { PageLoad } from './$types';
import {getAllProjects} from "$lib/projects";

const projects = getAllProjects();

export const load: PageLoad = () => {
	return {
		projects
	};
};
