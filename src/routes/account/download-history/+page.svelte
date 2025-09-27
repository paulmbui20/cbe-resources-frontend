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

	let history: any[] = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getDownloadHistory();
			if (res.status === 200 && res.data) {
				history = res.data ?? [];
			} else {
				toastStore.error(res.message || 'Failed to load download history');
			}
		} catch (e) {
			toastStore.error('Network error while loading download history');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Download History</h2>

	<div class="overflow-x-auto">
		<Table striped>
			<TableHead>
				<TableHeadCell>Product</TableHeadCell>
				<TableHeadCell>Order #</TableHeadCell>
				<TableHeadCell>Downloads</TableHeadCell>
				<TableHeadCell>Last Downloaded</TableHeadCell>
				<TableHeadCell>Expiry</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if loading}
					<TableBodyRow><TableBodyCell colspan={5}>Loading history...</TableBodyCell></TableBodyRow>
				{:else}
					{#each history as h}
						<TableBodyRow>
							<TableBodyCell>{h.product_name}</TableBodyCell>
							<TableBodyCell>#{h.order_number}</TableBodyCell>
							<TableBodyCell>{h.download_count}</TableBodyCell>
							<TableBodyCell>{h.last_downloaded}</TableBodyCell>
							<TableBodyCell>{h.download_expiry}</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>
</div>
