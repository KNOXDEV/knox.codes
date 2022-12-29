<script context="module">
    import img from './img.svelte';
    import a from './a.svelte';

    export {img, a};
</script>

<style>
    /* additional styling just for markdown sections */

    .markdown :global(ul) {
        @apply mb-6 pl-8 list-[square];
    }

    .markdown :global(li) {
        @apply mb-6 pl-8;
        list-style-type: decimal;
        list-style-position: inside;
    }

    .markdown :global(ul > li), .markdown :global(ol > li) {
        @apply pl-2 mb-3;
    }

    .markdown :global(h2) {
        @apply mt-12;
    }

    .markdown :global(h3) {
        @apply mt-12;
    }
</style>

<div class="markdown">
    <slot/>
</div>