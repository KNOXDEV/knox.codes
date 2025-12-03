<script lang="ts">
	import ArticleList from '$lib/ArticleList.svelte';

	export let data;
</script>

<ArticleList articles={data.articles} nextLink={data.nextLink} />
