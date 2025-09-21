<script lang="ts">
	import ProductsGrid from '../../components/ecommerce/products-grid.svelte';
	import { Section } from 'flowbite-svelte-blocks';
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

	<ProductsGrid />
</Section>
