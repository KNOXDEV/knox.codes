<script lang="ts">
    import layout from './(main)/+layout.svelte';
</script>

<!-- this whole file is a painful workaround since we can't handle 404s in any file but this one -->

<svelte:component this={layout}>
    <h1>Not found</h1>

    <p>Sorry, we're not sure what you're looking for.</p>
    <a href="/">Click here to go back home.</a>
</svelte:component>