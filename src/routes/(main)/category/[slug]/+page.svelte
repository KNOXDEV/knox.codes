<script lang="ts">
    import type {PageData} from './$types';
    import ArticleList from "$lib/ArticleList.svelte";

    export let data: PageData;
</script>

<h1 class="mb-10">{data.category}</h1>

<ArticleList articles={data.articles}/>