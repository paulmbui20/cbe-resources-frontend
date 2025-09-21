<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Lesson Plans | CBE Resources</title>
	<meta name="description" content="Access lesson plan templates and resources" />
</svelte:head>

{@render children?.()}
