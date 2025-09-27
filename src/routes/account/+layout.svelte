<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { toastStore } from '$lib/stores/toast';

	let triedRefresh = false;

	// Try to ensure we have a valid access token on mount
	onMount(async () => {
		let isAuthenticated = false;
		const unsub = auth.subscribe((s) => (isAuthenticated = s.isAuthenticated));
		unsub();

		// Only attempt refresh if we are not authenticated and there are no tokens in sessionStorage
		const hasAccess =
			typeof window !== 'undefined' ? !!sessionStorage.getItem('access_token') : false;
		const hasRefresh =
			typeof window !== 'undefined' ? !!sessionStorage.getItem('refresh_token') : false;

		if (!isAuthenticated && !hasAccess && !hasRefresh) {
			// Try to refresh using httpOnly cookie
			try {
				const res = await auth.refresh();
				triedRefresh = true;
				if (res && res.status === 200) {
					// success - do nothing, user will be authenticated
					toastStore.success('Session restored');
				} else {
					// redirect to login
					goto('/login');
				}
			} catch (e) {
				goto('/login');
			}
		}
	});
</script>

<div class="min-h-screen">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-6">
			<h1 class="text-3xl font-bold">My Account</h1>
			<p class="text-sm text-gray-600 dark:text-gray-300">
				Manage your profile, purchases and downloads
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Sidebar Navigation -->
			<aside class="lg:col-span-3">
				<div
					class="rounded-lg bg-white p-4 shadow dark:border dark:border-gray-700 dark:bg-gray-800"
				>
					<nav class="flex flex-col space-y-1">
						<a
							href="/account/settings"
							class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
							>Settings</a
						>
						<a
							href="/account/purchases"
							class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
							>Purchases</a
						>
						<a
							href="/account/downloads"
							class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
							>Downloads</a
						>
						<a
							href="/account/analytics"
							class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
							>Analytics</a
						>
						<button
							class="mt-4 w-full rounded-md border px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:border-gray-600 dark:text-red-400"
							on:click={() => goto('/login')}>Sign Out</button
						>
					</nav>
				</div>
			</aside>

			<!-- Main Content Area -->
			<main class="lg:col-span-9">
				<div class="rounded-lg bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>
