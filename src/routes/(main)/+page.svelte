<script lang="ts">
	import ArticleList from '$lib/ArticleList.svelte';

	let { data } = $props();
</script>

<ArticleList articles={data.articles} nextLink={data.nextLink} />
