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

	// Dummy downloads data - replace with actual data store
	const downloads = [
		{
			id: 1,
			name: 'Grade 5 Science Notes',
			downloadDate: '2025-09-20',
			expiryDate: '2026-09-20',
			size: '2.5 MB',
			downloads: 2
		},
		{
			id: 2,
			name: 'CBC Lesson Plan Template',
			downloadDate: '2025-09-20',
			expiryDate: '2026-09-20',
			size: '1.8 MB',
			downloads: 1
		}
	];
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
				{#each downloads as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>{item.downloadDate}</TableBodyCell>
						<TableBodyCell>{item.expiryDate}</TableBodyCell>
						<TableBodyCell>{item.size}</TableBodyCell>
						<TableBodyCell>{item.downloads}</TableBodyCell>
						<TableBodyCell>
							<Button size="xs">Download</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
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
