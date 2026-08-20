<script lang="ts">
	import type { VideoMetadata } from '$lib/videos';

	interface Props extends VideoMetadata {
		onClickSeries?: (series: string) => void;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		link,
		thumbnail,
		dateDisplay,
		series,
		venue,
		duration,
		videoCount,
		playlistId,
		onClickSeries,
		children
	}: Props = $props();
</script>

<div class="mb-10">
	<div class="mb-1 text-sm font-semibold uppercase">
		<time class="mr-2">{dateDisplay}</time>
		<a
			onclick={() => onClickSeries?.(series)}
			href={null}
			class="text-amber-500 hover:text-sky-500"
		>
			{series}
		</a>
		<span class="ml-2 text-gray-400">{venue}</span>
	</div>
	<h2>
		<a
			class="text-zinc-800 hover:text-amber-500"
			target="_blank"
			rel="external noopener noreferrer"
			href={link}
		>
			{title}
		</a>
	</h2>
	<div class="mt-2 flex flex-col gap-4 sm:flex-row sm:gap-6">
		<a
			class="block shrink-0 self-start hover:border-b-0 sm:w-50 {playlistId ? 'mt-2.5 mr-2.5' : ''}"
			target="_blank"
			rel="external noopener noreferrer"
			href={link}
		>
			<div class="relative">
				{#if playlistId}
					<div
						class="absolute inset-0 translate-x-2.5 -translate-y-2.5 rounded-md bg-gray-400"
					></div>
					<div class="absolute inset-0 translate-x-1 -translate-y-1 rounded-md bg-gray-600"></div>
				{/if}
				<img
					class="relative aspect-video w-full rounded-md object-cover"
					src={thumbnail}
					alt={title}
					loading="lazy"
				/>
				{#if videoCount}
					<span
						class="absolute right-1.5 bottom-1.5 rounded-sm bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white"
					>
						▶ {videoCount} videos
					</span>
				{:else if duration}
					<span
						class="absolute right-1.5 bottom-1.5 rounded-sm bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white tabular-nums"
					>
						{duration}
					</span>
				{/if}
			</div>
		</a>
		<div class="min-w-0 text-base leading-6 text-gray-800 [&_p:first-child]:mt-0">
			{@render children?.()}
		</div>
	</div>
</div>
