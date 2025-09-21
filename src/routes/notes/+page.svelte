<script lang="ts">
	import ResourceGrid from '../../components/ecommerce/resource-grid.svelte';
	import { productsStore } from '$lib/stores/dummy-products';

	let resourceItems: any[] = [];

	// Get items for this specific type (replace 'note' with the appropriate type)
	productsStore.getByType('note');
	productsStore.subscribe((items) => {
		resourceItems = items;
	});
</script>

<div class="container mx-auto px-4 py-8">
	<ResourceGrid title="Notes" products={resourceItems} />
</div>
