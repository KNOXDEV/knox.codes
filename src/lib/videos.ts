import type { Component } from 'svelte';

export async function getAllVideos(): Promise<Video[]> {
	const modules = await import.meta.glob(`$lib/videos/*.svx`);

	const videos = (await Promise.all(
		Object.entries(modules).map(async ([, resolver]) => {
			const { default: component, metadata } = (await resolver()) as {
				default: Component;
				metadata: VideoFrontmatter;
			};
			return {
				component,
				metadata: {
					...metadata,
					link: metadata.playlistId
						? `https://www.youtube.com/playlist?list=${metadata.playlistId}`
						: `https://www.youtube.com/watch?v=${metadata.videoId}`,
					thumbnail: `https://i.ytimg.com/vi/${metadata.thumbnailVideoId ?? metadata.videoId}/hqdefault.jpg`
				}
			};
		})
	)) as unknown as Video[];

	// ISO date strings sort lexicographically, newest first
	return videos.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export interface Video {
	component: Component;
	metadata: VideoMetadata;
}

interface VideoFrontmatter {
	title: string;
	// exactly one of videoId / playlistId must be set
	videoId?: string;
	playlistId?: string;
	// playlists have no thumbnail of their own; use one of their videos
	thumbnailVideoId?: string;
	videoCount?: number;
	// ISO date used for sorting; dateDisplay is what's shown (e.g. "Spring 2020")
	date: string;
	dateDisplay: string;
	series: string;
	venue: string;
	duration?: string;
}

export interface VideoMetadata extends VideoFrontmatter {
	link: string;
	thumbnail: string;
}
