<script lang="ts">
    import Project from "./Project.svelte";

    let currentTag: string | null = null;
    export let data;
    $: tags = [...new Set(data.projects.flatMap(project => project.metadata.tags))].sort();

    $: projects = currentTag !== null ? data.projects.filter(project => project.metadata.tags.includes(currentTag)) : data.projects;

    function onClickTag(tag: string) {
        if (currentTag === tag)
            currentTag = null;
        else
            currentTag = tag;
    }

</script>

<h1>Projects</h1>

<div class="uppercase mb-8 font-semibold text-xs flex flex-row gap-2 flex-wrap">
    {#each tags as tag}
        <a on:click={() => onClickTag(tag)} href=""
           class="rounded-full border-solid border px-4 py-1 text-zinc-800 whitespace-nowrap {currentTag === tag ? 'text-sky-500 border-sky-500' : '' }">{tag}</a>
    {/each}
</div>

{#each projects as project}
    <Project {...project.metadata}>
        <svelte:component this={project.component}/>
    </Project>
{/each}