<script lang="ts">
    import type {PostMetadata} from "$lib/posts";
    import format from "date-fns/format";
    import {getSlugFromTag} from "$lib/posts.js";

    export let articles: PostMetadata;
    export let previousLink: string;
    export let nextLink: string;
</script>

{#each articles as article}
    <div class="mb-10">
        <div class="uppercase mb-1 font-semibold text-sm">
            <time class="mr-2">{format(article.date, 'MMMM y')}</time>
            <a href="/category/{getSlugFromTag(article.category)}" class="text-amber-500 hover:text-sky-500">
                {article.category}
            </a>
        </div>
        <h2>
            <a class="text-zinc-800" href="/posts/{article.slug}">
                {article.title}
            </a>
        </h2>
        <p class="mb-4 leading-6 text-gray-800 text-base">{article.description}</p>
        <a class="text-sky-500 border-solid border-current hover:border-b" href="/posts/{article.slug}">Read</a>
    </div>
{/each}

<div class="grid grid-cols-2">
    <div class="text-left">
        <a class="uppercase text-amber-500 hover:text-sky-500 font-bold text-3xl {previousLink || 'pointer-events-none text-gray-400'}"
           href="{previousLink}">← Prev</a>
    </div>
    <div class="text-right">
        <a class="uppercase text-amber-500 hover:text-sky-500 font-bold text-3xl {nextLink || 'pointer-events-none text-gray-400'}"
           href="{nextLink}">Next →</a>
    </div>
</div>