<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Shopping Cart | CBE Resources</title>
	<meta name="description" content="View and manage your shopping cart items" />
</svelte:head>

{@render children?.()}
