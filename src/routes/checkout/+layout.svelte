<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Checkout | CBE Resources</title>
	<meta name="description" content="Complete your purchase" />
</svelte:head>

{@render children?.()}
