<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { toastStore } from '$lib/stores/toast';

	let user: any = null;

	const unsub = auth.subscribe((s) => (user = s.user));

	async function doLogout() {
		await auth.logout();
		toastStore.success('You have been logged out');
	}
</script>

<section class="mx-auto max-w-4xl py-6">
	<h1 class="text-2xl font-bold">Account Dashboard</h1>
	{#if user}
		<div class="mt-4">
			<p><strong>Username:</strong> {user.username}</p>
			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}</p>
		</div>
		<button class="btn mt-4" on:click={doLogout}>Sign Out</button>
	{:else}
		<p>Loading...</p>
	{/if}
</section>
