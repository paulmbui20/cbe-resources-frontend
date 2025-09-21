<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Products</title>
	<meta
		name="description"
		content="Browse our selection of products, like cbc notes, schemes of work, and more"
	/>
</svelte:head>

{@render children?.()}
