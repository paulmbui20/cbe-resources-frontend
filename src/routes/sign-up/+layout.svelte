<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Create an account" />
</svelte:head>

{@render children?.()}
