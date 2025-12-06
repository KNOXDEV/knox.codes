<script>
	let {
		href = '#',
		openInNewTab,
		children,
		...remainingProps
	} = $props();

	// if a link is going offsite, open in a new tab
	let newTab = $derived(openInNewTab == true || href.includes('://'));

</script>

<a
	{href}
	{...remainingProps}
	target={newTab ? '_blank' : ''}
	rel={newTab ? 'noopener noreferrer' : ''}
>
	{@render children?.()}
</a>
