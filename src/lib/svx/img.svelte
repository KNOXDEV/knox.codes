<script>
    import A from './a.svelte';
</script>

<A isOffsite={true} href={$$props.src}>
    <img src={$$props.src} alt={$$props.alt} {...$$props} class="mx-auto max-w"/>
</A>
{#if $$props.alt }
    <div class="text-gray-500 italic text-center w-full">{$$props.alt}</div>
{/if}