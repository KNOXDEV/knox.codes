<script lang="ts">
	interface Props {
		title?: string;
		children?: import('svelte').Snippet;
	}

	let { title = 'Click to show', children }: Props = $props();
	let show = $state(false);
	let icon = $derived(show ? '&#x2BC6;' : '&#x2BC8;');

	const toggle = () => {
		show = !show;
	};
</script>

<div class="flex flex-row">
	<div>
		<button
			onclick={toggle}
			class="hover:bg-gray-100 active:bg-gray-200 px-1.5 rounded-md grow-0 mr-1"
			>{@html icon}</button
		>
	</div>
	<div>
		<strong>{title}</strong>
		{#if show}
			{@render children?.()}
		{/if}
	</div>
</div>
