<script module>
	import img from './img.svelte';
	import a from './a.svelte';

	/* eslint-disable-next-line no-import-assign -- false positive on mdsvex component override re-exports */
	export { img, a };
</script>

<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="markdown">
	{@render children?.()}
</div>

<style type="postcss">
	@reference "tailwindcss";
	/* additional styling just for markdown sections */

	.markdown :global(ul) {
		@apply mb-6 list-outside list-[square] pl-8;
	}

	.markdown :global(ol) {
		@apply mb-6 list-outside list-[decimal] pl-8;
	}

	.markdown :global(.contains-task-list) {
		@apply list-none p-0;
	}

	.markdown :global(.task-list-item > input) {
		@apply mx-1;
	}

	.markdown :global(ul > li),
	.markdown :global(ol > li) {
		@apply mb-3 pl-2;
	}

	.markdown :global(h2) {
		@apply mt-12;
	}

	.markdown :global(h3) {
		@apply mt-12;
	}

	.markdown :global(hr) {
		@apply mx-auto my-12 max-w-xs border-t-4 border-zinc-800;
	}

	.markdown :global(pre.shiki) {
		@apply overflow-auto rounded bg-slate-600 p-4 text-base;
	}

	.markdown :global(:not(.shiki) code) {
		@apply rounded bg-slate-200 p-1;
	}

	.markdown :global(blockquote) {
		@apply border-l-4 border-solid pl-4 text-zinc-600;
	}

	.markdown :global(table) {
		@apply mt-4 mb-6 w-full table-auto text-sm;
	}

	.markdown :global(th) {
		@apply py-3 text-xs uppercase;
	}

	.markdown :global(tr) {
		@apply border-b;
	}

	.markdown :global(td) {
		@apply py-3;
	}
</style>
