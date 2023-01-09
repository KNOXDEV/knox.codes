<script context="module">
    import img from './img.svelte';
    import a from './a.svelte';

    export {img, a};
</script>

<style>
    /* additional styling just for markdown sections */

    .markdown :global(ul) {
        @apply mb-6 pl-8 list-[square] list-outside;
    }

    .markdown :global(ol) {
        @apply mb-6 pl-8 list-[decimal] list-outside;
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

    .markdown :global(hr) {
        @apply max-w-xs mx-auto my-12 border-t-4 border-zinc-800;
    }

    .markdown :global(pre.shiki) {
        @apply overflow-scroll text-base p-4 rounded bg-slate-600;
    }

    .markdown :global(:not(.shiki) code) {
        @apply p-1 rounded bg-slate-200;
    }

    .markdown :global(blockquote) {
        @apply border-l-4 border-solid pl-4 text-zinc-600;
    }

    .markdown :global(table) {
        @apply table-auto w-full text-sm mt-4 mb-6;
    }

    .markdown :global(th) {
        @apply uppercase text-xs py-3;
    }

    .markdown :global(tr) {
        @apply border-b;
    }

    .markdown :global(td) {
        @apply py-3;
    }

</style>

<div class="markdown">
    <slot/>
</div>