import type {SvelteComponent} from 'svelte';

const STATUS: { [key: string]: ProjectStatus } = {
    COMPLETE: {
        text: 'Complete',
        description: 'This project is complete and will not be worked on.',
        colorClass: 'text-zinc-400'
    },
    RELEASED: {
        text: 'Released',
        description: 'This project is released and is still being worked on.',
        colorClass: 'text-sky-400'
    },
    WIP: {
        text: 'Work in Progress',
        description: 'This project is being worked on and has not yet been released.',
        colorClass: 'text-amber-400'
    },
}

const modules = await import.meta.glob(`$lib/projects/*.svx`);

const projects = (await Promise.all(
    Object.entries(modules).map(async ([, resolver]) => {
        const {default: component, metadata} = (await resolver()) as {
            default: SvelteComponent;
            metadata: ProjectMetadata & { status: string; };
        };
        return {
            component,
            metadata: {
                ...metadata,
                tags: metadata.tags?.map(tag => tag.toLowerCase()),
                status: STATUS[metadata.status] ?? STATUS['COMPLETE']
            }
        };
    })
)) as unknown as Project[];

const sortedProjects = [...projects]
    .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));

export function getAllProjects(): Project[] {
    return sortedProjects;
}

export interface ProjectStatus {
    text: string;
    description: string;
    colorClass: string;
}


export interface Project {
    component: SvelteComponent;
    metadata: ProjectMetadata;
}

export interface ProjectMetadata {
    title: string;
    status: ProjectStatus;
    link: string;
    tags: string[];
}
