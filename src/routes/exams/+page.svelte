<script lang="ts">
	import ResourceGrid from '../../components/ecommerce/resource-grid.svelte';
	import { productsStore } from '$lib/stores/dummy-products';

	let resourceItems: any[] = [];
	productsStore.getByType('exam');
	productsStore.subscribe((items) => (resourceItems = items));
</script>

<div class="container mx-auto px-4 py-8">
	<ResourceGrid title="Exams" products={resourceItems} />
</div>
