<script lang="ts">
	import SearchFilter from './search-filter.svelte';
	import { productsStore } from '$lib/stores/dummy-products';
	import { goto } from '$app/navigation';

	let selected: any = null;

	function onSelect(e: CustomEvent) {
		selected = e.detail.product;
		// Navigate to product page if you have one, else console
		console.log('Selected suggestion', selected);
	}

	function onSearch(e: CustomEvent) {
		// For now, route to products page with query param
		const q = encodeURIComponent(e.detail.term || '');
		goto(`/products?q=${q}`);
	}
</script>

<div class="relative">
	<SearchFilter
		placeholder="Search lesson plans, notes, exams, schemes..."
		on:select={onSelect}
		on:search={onSearch}
	/>
</div>
