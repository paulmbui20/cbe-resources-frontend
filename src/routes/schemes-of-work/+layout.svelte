<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Schemes of Work | CBE Resources</title>
	<meta name="description" content="Access educational schemes of work and teaching plans" />
</svelte:head>

{@render children?.()}
