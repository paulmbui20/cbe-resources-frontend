<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { toastStore } from '$lib/stores/toast';
	import { page } from '$app/stores';

	let triedRefresh = false;

	// Determine whether we should render the full account chrome or just pass-through
	$: isPasswordResetRoute = $page.url.pathname.startsWith('/accounts/password-reset');

	onMount(async () => {
		// Skip authentication check for password reset routes
		if (isPasswordResetRoute) {
			return;
		}

		let isAuthenticated = false;
		const unsub = auth.subscribe((s) => (isAuthenticated = s.isAuthenticated));
		unsub();

		const hasAccess =
			typeof window !== 'undefined' ? !!sessionStorage.getItem('access_token') : false;
		const hasRefresh =
			typeof window !== 'undefined' ? !!sessionStorage.getItem('refresh_token') : false;

		if (!isAuthenticated && !hasAccess && !hasRefresh) {
			try {
				const res = await auth.refresh();
				triedRefresh = true;
				if (res && res.status === 200) {
					toastStore.success('Session restored');
				} else {
					goto('/login');
				}
			} catch (e) {
				goto('/login');
			}
		}
	});
</script>

{#if isPasswordResetRoute}
	<!-- Password reset routes use their own layout and bypass authentication -->
	<slot />
{:else}
	<!-- Regular account pages with full chrome and authentication -->
	<div class="min-h-screen">
		<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div class="mb-6">
				<h1 class="text-3xl font-bold dark:text-white">My Account</h1>
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
								href="/accounts"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Overview</a
							>
							<a
								href="/accounts/orders"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Orders</a
							>
							<a
								href="/accounts/payments"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Payments</a
							>
							<a
								href="/accounts/settings"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Settings</a
							>
							<a
								href="/accounts/purchases"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Purchases</a
							>
							<a
								href="/accounts/downloads"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Downloads</a
							>
							<a
								href="/accounts/download-history"
								class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Download History</a
							>
							<a
								href="/accounts/resend-verification"
								class="mt-3 block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
								>Resend verification</a
							>
							<button
								class="mt-4 w-full rounded-md border px-3 py-2 text-left text-red-600 hover:bg-red-50 dark:border-gray-600 dark:text-red-400"
								on:click={async () => {
									await auth.logout();
									toastStore.success('Signed out');
									goto('/');
								}}
							>
								Sign Out
							</button>
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
{/if}
