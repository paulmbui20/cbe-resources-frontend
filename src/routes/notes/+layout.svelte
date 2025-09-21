<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Notes | CBE Resources</title>
	<meta name="description" content="Access educational notes and study materials" />
</svelte:head>

{@render children?.()}
