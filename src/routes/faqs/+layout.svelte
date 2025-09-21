<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>FAQs | CBE Resources</title>
	<meta name="description" content="Frequently asked questions" />
</svelte:head>

{@render children?.()}
