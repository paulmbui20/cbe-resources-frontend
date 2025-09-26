<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact page" />
</svelte:head>

{@render children?.()}
