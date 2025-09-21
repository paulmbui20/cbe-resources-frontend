<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Sitemap | CBE Resources</title>
	<meta name="description" content="View the complete site structure and navigation" />
</svelte:head>

{@render children?.()}
