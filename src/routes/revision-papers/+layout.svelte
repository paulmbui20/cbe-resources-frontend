<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Revision Papers | CBE Resources</title>
	<meta name="description" content="Access revision papers and study materials" />
</svelte:head>

{@render children?.()}
