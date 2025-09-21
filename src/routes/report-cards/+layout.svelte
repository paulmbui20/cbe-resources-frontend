<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Report Cards | CBE Resources</title>
	<meta name="description" content="Access report card templates and resources" />
</svelte:head>

{@render children?.()}
