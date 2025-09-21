<script lang="ts">

	let { children } = $props();

</script>
<svelte:head>
	<title>About</title>
	<meta name="description" content="About page" />
</svelte:head>

{@render children?.()}