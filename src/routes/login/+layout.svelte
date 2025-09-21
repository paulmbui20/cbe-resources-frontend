<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Sign in to your account" />
</svelte:head>

{@render children?.()}
