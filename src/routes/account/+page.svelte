<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { auth } from '$lib/stores/auth';

	let dashboard: any = null;
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getDashboard();
			if (res.status === 200 && res.data) {
				dashboard = res.data;
			} else {
				toastStore.error(res.message || 'Failed to load dashboard');
			}
		} catch (e) {
			toastStore.error('Network error while loading dashboard');
		} finally {
			loading = false;
		}
	});

	async function doLogout() {
		await auth.logout();
		toastStore.success('You have been logged out');
		location.href = '/';
	}
</script>

<section class="mx-auto max-w-4xl py-6">
	<h1 class="text-2xl font-bold">Account Dashboard</h1>
	{#if loading}
		<p>Loading...</p>
	{:else if dashboard}
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Orders</p>
				<p class="mt-2 text-2xl font-bold">{dashboard.total_orders ?? 0}</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Purchases</p>
				<p class="mt-2 text-2xl font-bold">{dashboard.total_purchases ?? 0}</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Downloads</p>
				<p class="mt-2 text-2xl font-bold">{dashboard.total_downloads ?? 0}</p>
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<h3 class="text-lg font-semibold">Recent Orders</h3>
				{#if dashboard.recent_orders && dashboard.recent_orders.length > 0}
					<ul class="mt-4 space-y-3">
						{#each dashboard.recent_orders as o}
							<li class="flex items-center justify-between">
								<div>
									<div class="font-medium">#{o.order_number}</div>
									<div class="text-sm text-gray-500">{o.created_at} · {o.status}</div>
								</div>
								<div class="text-right">
									<div class="font-medium">Ksh. {o.total_amount}</div>
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="mt-4 text-sm text-gray-500">No recent orders</p>
				{/if}
			</div>

			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<h3 class="text-lg font-semibold">Recent Downloads</h3>
				{#if dashboard.recent_downloads && dashboard.recent_downloads.length > 0}
					<ul class="mt-4 space-y-3">
						{#each dashboard.recent_downloads as d}
							<li class="flex items-center justify-between">
								<div>
									<div class="font-medium">{d.product_name}</div>
									<div class="text-sm text-gray-500">Order #{d.order_number}</div>
								</div>
								<div class="text-sm text-gray-500">{d.download_expires_at}</div>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="mt-4 text-sm text-gray-500">No recent downloads</p>
				{/if}
			</div>
		</div>
	{:else}
		<p>No dashboard data available</p>
	{/if}
</section>
