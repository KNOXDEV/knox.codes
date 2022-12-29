<script>
    export let data;
</script>

<style>
    .post :global(p), .post :global(li) {
        @apply text-lg leading-relaxed;
    }
</style>

<div class="md:fixed left-12 -top-6 grid justify-items-center mt-10"><a href="/">← All Articles</a></div>

<div class="mx-auto max-w-screen-md post px-4 max-w-prose text-lg">
    <h1 class="sm:text-5xl text-center mt-12 mb-8 sm:leading-tight">{data.metadata.title}</h1>

    <svelte:component this={data.post} class="post"/>
</div>