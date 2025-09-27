<script lang="ts">
	import { onMount } from 'svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';

	let orders: any[] = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getOrders();
			if (res.status === 200 && res.data) {
				orders = res.data.orders ?? res.data ?? [];
			} else {
				toastStore.error(res.message || 'Failed to load orders');
			}
		} catch (e) {
			toastStore.error('Network error while loading orders');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">My Orders</h2>

	<div class="overflow-x-auto">
		<Table striped>
			<TableHead>
				<TableHeadCell>Order #</TableHeadCell>
				<TableHeadCell>Date</TableHeadCell>
				<TableHeadCell>Items</TableHeadCell>
				<TableHeadCell>Total</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if loading}
					<TableBodyRow><TableBodyCell colspan={5}>Loading orders...</TableBodyCell></TableBodyRow>
				{:else}
					{#each orders as o}
						<TableBodyRow>
							<TableBodyCell>#{o.order_number}</TableBodyCell>
							<TableBodyCell>{o.created_at}</TableBodyCell>
							<TableBodyCell>{o.item_count}</TableBodyCell>
							<TableBodyCell>Ksh. {o.total_amount}</TableBodyCell>
							<TableBodyCell>{o.status}</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>
</div>
