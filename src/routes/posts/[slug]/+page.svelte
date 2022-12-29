<script lang="ts">
    import type {PageData} from './$types';
    import format from 'date-fns/format';

    export let data: PageData;

    let {post: {metadata, component}} = data;

</script>

<div class="md:fixed left-12 -top-6 grid justify-items-center mt-10"><a href="/">← All Articles</a></div>

<div class="mx-auto max-w-screen-md post max-w-prose sm:px-0 px-4 text-lg leading-relaxed">
    <h1 class="sm:text-5xl text-center mt-12 mb-8 sm:leading-tight">{metadata.title}</h1>

    <svelte:component this={component} class="post"/>

    <div class="text-base">
        <p class="italic">Published {format(metadata.date, 'MMMM do, y')}</p>
        <hr class="my-10"/>
        <p>
            The ramblings of a software engineer, with an emphasis on security. <br/>
            <span class="text-gray-400">&copy; Aaron James 2022</span>
        </p>
    </div>
</div>