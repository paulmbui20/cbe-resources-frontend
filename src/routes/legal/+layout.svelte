<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Legal | CBE Resources</title>
	<meta name="description" content="Legal information and policies" />
</svelte:head>

{@render children?.()}
