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

	let downloads: any[] = [];
	let loading = false;

	onMount(async () => {
		loading = true;
		try {
			const res = await apiService.getDownloads();
			if (res.status === 200 && res.data) {
				downloads = res.data.downloads ?? res.data.items ?? res.data ?? [];
			} else {
				toastStore.error(res.message ?? 'Failed to load downloads');
			}
		} catch (err) {
			console.error('Failed to fetch downloads', err);
			toastStore.error('Network error while loading downloads');
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-2xl font-bold">My Downloads</h2>
	</div>

	<div class="overflow-x-auto">
		<Table striped>
			<TableHead>
				<TableHeadCell>Resource Name</TableHeadCell>
				<TableHeadCell>Download Date</TableHeadCell>
				<TableHeadCell>Expiry Date</TableHeadCell>
				<TableHeadCell>Size</TableHeadCell>
				<TableHeadCell>Downloads Left</TableHeadCell>
				<TableHeadCell>Action</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if loading}
					<TableBodyRow>
						<TableBodyCell colspan={6}>Loading downloads...</TableBodyCell>
					</TableBodyRow>
				{:else}
					{#each downloads as d}
						<TableBodyRow>
							<TableBodyCell>{d.product_name}</TableBodyCell>
							<TableBodyCell>{d.created_at ?? d.downloaded_at}</TableBodyCell>
							<TableBodyCell>{d.download_expires_at}</TableBodyCell>
							<TableBodyCell>{d.file_size ?? d.size}</TableBodyCell>
							<TableBodyCell>{d.download_count ?? d.downloads}</TableBodyCell>
							<TableBodyCell>
								{#if d.download_url}
									<a href={d.download_url} class="text-primary-600 hover:underline">Download</a>
								{:else}
									<Button size="xs">Expired</Button>
								{/if}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>

	{#if downloads.length === 0}
		<div class="rounded-lg bg-gray-50 p-8 text-center">
			<h3 class="mb-2 text-xl font-semibold">No Downloads Available</h3>
			<p class="mb-4 text-gray-600">Your downloaded resources will appear here.</p>
			<Button href="/products">Browse Resources</Button>
		</div>
	{/if}

	<div class="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
		<p class="mb-2"><strong>Note:</strong></p>
		<ul class="list-inside list-disc space-y-1">
			<li>Downloads are available for 1 year from purchase date</li>
			<li>Each resource can be downloaded up to 3 times</li>
			<li>Contact support if you need to reset your download count</li>
		</ul>
	</div>
</div>
