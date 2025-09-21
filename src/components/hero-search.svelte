<script lang="ts">
	import SearchFilter from './search-filter.svelte';
	import { goto } from '$app/navigation';

	let selected: any = null;

	function onSelect(e: CustomEvent) {
		selected = e.detail.product;
		if (selected && selected.slug) {
			// navigate to product details only when a suggestion is clicked
			goto(`/products/${selected.slug}`);
		}
	}

	function onSearch(e: CustomEvent) {
		// Do not redirect immediately on typing. Parent pages can listen to search events.
		// You can still navigate on explicit search if you want by uncommenting below:
		// const q = encodeURIComponent(e.detail.term || '');
		// goto(`/products?q=${q}`);
	}
</script>

<div class="relative">
	<SearchFilter
		placeholder="Search lesson plans, notes, exams, schemes..."
		on:select={onSelect}
		on:search={onSearch}
	/>
</div>
