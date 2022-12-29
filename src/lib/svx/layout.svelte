<script context="module">
    import img from './img.svelte';

    export {img};
</script>

<style>
    /* unfortunately we need to use direct css to style markdown because we can't add classes to the DOM nodes
     *  produced by mdsvex. we will continue to use tailwind's theme whenever possible for consistency
     */
    .markdown {
        color: theme('textColor.zinc.800')
    }

    .markdown :global(h1) {
        font-size: theme('fontSize.4xl');
        font-weight: bold;
        margin-bottom: theme('spacing.8');
    }

    .markdown :global(p) {
        line-height: theme('spacing.6');
        margin-bottom: theme('spacing.6');
    }

    .markdown :global(a) {
        color: theme('textColor.sky.500');
    }

    .markdown :global(a:hover) {
        color: theme('textColor.amber.500');
    }

    .markdown :global(ul) {
        margin-bottom: theme('spacing.6');
        list-style-type: square;
        padding-left: theme('spacing.8');
    }

    .markdown :global(ul > li) {
        padding-left: theme('spacing.2');
        margin-bottom: theme('spacing.3');
    }

</style>

<div class="markdown">
    <slot/>
</div>