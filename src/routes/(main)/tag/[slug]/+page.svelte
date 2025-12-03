<script lang="ts">
	import type { PageData } from './$types';
	import ArticleList from '$lib/ArticleList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1 class="mb-10">{data.tag}</h1>

<ArticleList articles={data.articles} />
