<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import type { Product } from '$lib/stores/dummy-products';
	import ResourceCard from './resource-card.svelte';
	import Pagination from '../pagination.svelte';

	export let title: string;
	export let products: Product[] = [];
	export let pageSize = 4;

	let page = 1;

	const start = () => (page - 1) * pageSize;
	const end = () => start() + pageSize;

	let pagedItems: Product[] = [];

	$: pageCount = Math.max(1, Math.ceil(products.length / pageSize));

	// If the product list changes (filter/search), ensure page is valid —
	// reset to 1 when current page would be out of range.
	$: if (page > pageCount) page = 1;

	$: pagedItems = products.slice((page - 1) * pageSize, page * pageSize);
	// debug: show when page or pagedItems change
	$: console.debug(
		'[resource-grid] page=',
		page,
		'pageCount=',
		pageCount,
		'start=',
		start(),
		'end=',
		end(),
		'pagedItems=',
		pagedItems.length
	);
</script>

<div class="">
	<Heading tag="h1" class="mb-4">{title}</Heading>

	<div class="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if products.length === 0}
			<div class="col-span-full rounded-lg bg-white p-6 shadow dark:bg-gray-800">
				<h2 class="mb-4 text-xl font-bold">More Content Coming Soon</h2>
				<p class="text-gray-600 dark:text-gray-400">
					We're constantly adding new resources to our collection. Check back soon for updates!
				</p>
			</div>
		{:else}
			{#each pagedItems as product}
				<ResourceCard {product} />
			{/each}
		{/if}
	</div>

	{#if products.length > pageSize}
		<Pagination bind:page {pageSize} total={products.length} />
	{/if}
</div>
