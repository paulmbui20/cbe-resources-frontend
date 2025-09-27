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

	let payments: any[] = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getPayments();
			if (res.status === 200 && res.data) {
				payments = res.data.payments ?? res.data ?? [];
			} else {
				toastStore.error(res.message || 'Failed to load payments');
			}
		} catch (e) {
			toastStore.error('Network error while loading payments');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Payment History</h2>

	<div class="overflow-x-auto">
		<Table striped>
			<TableHead>
				<TableHeadCell>Transaction ID</TableHeadCell>
				<TableHeadCell>Date</TableHeadCell>
				<TableHeadCell>Order #</TableHeadCell>
				<TableHeadCell>Amount</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if loading}
					<TableBodyRow><TableBodyCell colspan={5}>Loading payments...</TableBodyCell></TableBodyRow
					>
				{:else}
					{#each payments as p}
						<TableBodyRow>
							<TableBodyCell>{p.transaction_id}</TableBodyCell>
							<TableBodyCell>{p.created_at}</TableBodyCell>
							<TableBodyCell>#{p.order_number}</TableBodyCell>
							<TableBodyCell>{p.amount} {p.currency}</TableBodyCell>
							<TableBodyCell>{p.status_display ?? p.status}</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>
</div>
