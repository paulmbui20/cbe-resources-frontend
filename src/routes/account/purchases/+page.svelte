<script lang="ts">
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';

	let purchases: any[] = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getPurchases();
			if (res.status === 200 && res.data) {
				purchases = res.data.purchases ?? res.data.items ?? res.data ?? [];
			} else {
				toastStore.error(res.message ?? 'Failed to load purchases');
			}
		} catch (err) {
			console.error('Failed to fetch purchases', err);
			toastStore.error('Network error while loading purchases');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">My Purchases</h2>
		<Button href="/products" color="primary">Browse More Resources</Button>
	</div>

	<div class="overflow-x-auto">
		<Table striped>
			<TableHead>
				<TableHeadCell>Order ID</TableHeadCell>
				<TableHeadCell>Date</TableHeadCell>
				<TableHeadCell>Items</TableHeadCell>
				<TableHeadCell>Total (KES)</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
				<TableHeadCell>Actions</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if loading}
					<TableBodyRow>
						<TableBodyCell colspan={6}>Loading purchases...</TableBodyCell>
					</TableBodyRow>
				{:else}
					{#each purchases as p}
						<TableBodyRow>
							<TableBodyCell>{p.order_number ?? p.id}</TableBodyCell>
							<TableBodyCell>{p.purchase_date ?? p.created_at}</TableBodyCell>
							<TableBodyCell
								>{p.product_name ??
									p.items
										?.map((i: { product_name: string }) => i.product_name)
										.join(', ')}</TableBodyCell
							>
							<TableBodyCell>{p.price ?? p.total_amount}</TableBodyCell>
							<TableBodyCell>{p.download_available ? 'Available' : p.status}</TableBodyCell>
							<TableBodyCell>
								{#if p.download_url}
									<a href={p.download_url} class="text-primary-600 hover:underline">Download</a>
								{:else}
									<Button size="xs" href="/account/downloads">Downloads</Button>
								{/if}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>

	{#if purchases.length === 0}
		<div class="rounded-lg bg-gray-50 p-8 text-center">
			<h3 class="mb-2 text-xl font-semibold">No Purchases Yet</h3>
			<p class="mb-4 text-gray-600">Start exploring our educational resources today!</p>
			<Button href="/products">Browse Resources</Button>
		</div>
	{/if}
</div>
