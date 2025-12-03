<script>
	export let href = '#';
	// if a link is going offsite, open in a new tab
	export let isOffsite = href.includes('://');
</script>

<a
	{href}
	{...$$props}
	target={isOffsite ? '_blank' : ''}
	rel={isOffsite ? 'noopener noreferrer' : ''}
>
	<slot />
</a>
