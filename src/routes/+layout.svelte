<script>
    import "../app.css";
    import {page} from '$app/stores';

    $: seo = $page.data.seo || {};
</script>

<svelte:head>
    <title>{seo.title ? `${seo.title} - ` : ''} knox.codes</title>
    <meta name="description" content={seo.description || 'Nick Knox does some coding.'}/>
    <meta property="og:image" content={ seo.socialImage || '/profile.png' }/>
    <meta property="og:site_name" content="knox.codes"/>
    <meta name="theme-color" content="#F7A046">

    <link rel="alternate" type="application/rss+xml" title="knox.codes" href="/rss.xml">
    <link rel="sitemap" type="application/xml" href="/sitemap.xml">
</svelte:head>

<slot/>
