<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Exams | CBE Resources</title>
	<meta name="description" content="Access past examination papers and resources" />
</svelte:head>

{@render children?.()}
