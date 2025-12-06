<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script>
	let {
		href = '#',
		// if a link is going offsite, open in a new tab
		isOffsite = href.includes('://'),
		children,
		...remainingProps
	} = $props();
</script>

<a
	{href}
	{...remainingProps}
	target={isOffsite ? '_blank' : ''}
	rel={isOffsite ? 'noopener noreferrer' : ''}
>
	{@render children?.()}
</a>
