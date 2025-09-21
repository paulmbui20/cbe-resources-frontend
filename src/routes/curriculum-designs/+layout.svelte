<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Curriculum Designs | CBE Resources</title>
	<meta name="description" content="Access curriculum design resources and materials" />
</svelte:head>

{@render children?.()}
