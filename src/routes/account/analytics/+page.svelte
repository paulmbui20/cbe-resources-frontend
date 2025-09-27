<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';

	let stats: any = null;
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getStats();
			if (res.status === 200 && res.data) {
				stats = res.data;
			} else {
				toastStore.error(res.message || 'Failed to load stats');
			}
		} catch (e) {
			toastStore.error('Network error while loading stats');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Analytics</h2>

	{#if loading}
		<p>Loading stats...</p>
	{:else if stats}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Spent</p>
				<p class="mt-2 text-2xl font-bold">Ksh. {stats.total_spent ?? 0}</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Purchases</p>
				<p class="mt-2 text-2xl font-bold">{stats.total_purchases ?? 0}</p>
			</div>
			<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
				<p class="text-sm text-gray-500">Total Downloads</p>
				<p class="mt-2 text-2xl font-bold">{stats.total_downloads ?? 0}</p>
			</div>
		</div>

		<div class="mt-6">
			<h3 class="text-lg font-semibold">Recent Orders</h3>
			{#if stats.recent_activity?.recent_orders?.length}
				<ul class="mt-3 space-y-2">
					{#each stats.recent_activity.recent_orders as o}
						<li class="flex items-center justify-between">
							<div>
								<div class="font-medium">#{o.order_number}</div>
								<div class="text-sm text-gray-500">{o.created_at} · {o.status}</div>
							</div>
							<div>Ksh. {o.total_amount}</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-sm text-gray-500">No recent orders</p>
			{/if}
		</div>
	{:else}
		<p>No stats available</p>
	{/if}
</div>
