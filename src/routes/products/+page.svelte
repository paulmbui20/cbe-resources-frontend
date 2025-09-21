<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import ResourceGrid from '../../components/ecommerce/resource-grid.svelte';
	import SearchFilter from '../../components/search-filter.svelte';
	import { productsStore, type Product } from '$lib/stores/dummy-products';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let allItems: Product[] = [];
	let resourceItems: Product[] = [];

	productsStore.subscribe((items) => {
		allItems = items;
		resourceItems = items;
	});

	// handle search/filter events
	function onSearch(e: CustomEvent) {
		const term: string = e.detail.term || '';
		const filters: string[] = e.detail.filters || [];
		resourceItems = allItems.filter((p) => {
			const matchesTerm =
				!term ||
				p.title.toLowerCase().includes(term.toLowerCase()) ||
				(p.subject || '').toLowerCase().includes(term.toLowerCase());
			const matchesFilter = filters.length === 0 || filters.includes(p.type);
			return matchesTerm && matchesFilter;
		});
	}

	function onSelect(e: CustomEvent) {
		// navigate or filter to selected product
		resourceItems = allItems.filter((p) => p.id === e.detail.product.id);
	}
</script>

<Section name="default" class="my-2 py-1">
	<div class="my-0 mb-4 text-center">
		<h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
			Browse our selection of products
		</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400">
			Browse our selection of products, like cbc notes, schemes of work, and more
		</p>
	</div>

	<div class="mb-4">
		<SearchFilter
			placeholder="Search products, subjects or types..."
			on:search={onSearch}
			on:select={onSelect}
		/>
	</div>

	<ResourceGrid title="All Products" products={resourceItems} />
</Section>
