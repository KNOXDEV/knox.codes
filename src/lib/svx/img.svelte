<script lang="ts">
	import A from './a.svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let { ...props }: HTMLImgAttributes = $props();
</script>

<A openInNewTab={true} href={props.src ?? undefined}>
	<img src={props.src} alt={props.alt} {...props} class="mx-auto max-w" />
</A>
{#if props.alt}
	<div class="text-gray-500 italic text-center w-full">{props.alt}</div>
{/if}
