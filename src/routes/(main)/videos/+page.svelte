<script lang="ts">
	import Video from './Video.svelte';

	let currentSeries: string | null = $state(null);
	let { data } = $props();
	let allSeries = $derived([...new Set(data.videos.map((video) => video.metadata.series))].sort());

	let videos = $derived(
		data.videos.filter((video) => currentSeries == null || video.metadata.series === currentSeries)
	);

	function onClickSeries(series: string) {
		if (currentSeries === series) currentSeries = null;
		else currentSeries = series;
	}
</script>

<h1>Videos</h1>

<p>
	I give talks and workshops in addition to my writings, perhaps more so. Everything below links out
	to YouTube; check out
	<a href="https://www.youtube.com/@nickknoxdev" target="_blank" rel="external noopener noreferrer"
		>my channel</a
	> where I will upload most of them.
</p>

<div class="mb-8 flex flex-row flex-wrap gap-2 text-xs font-semibold uppercase">
	{#each allSeries as series (series)}
		<a
			onclick={() => onClickSeries(series)}
			href={null}
			class="rounded-full border border-solid px-4 py-1 whitespace-nowrap text-zinc-800 hover:border-amber-500 hover:text-amber-500 {currentSeries ===
			series
				? 'border-sky-500 text-sky-500'
				: ''}">{series}</a
		>
	{/each}
</div>

{#each videos as video (video.metadata.title)}
	<Video {...video.metadata} {onClickSeries}>
		<video.component />
	</Video>
{/each}
