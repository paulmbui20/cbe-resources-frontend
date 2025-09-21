<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import type { Product } from '$lib/stores/dummy-products';
	import { cart } from '$lib/stores/cart';
	import ResourceCard from './resource-card.svelte';

	export let title: string;
	export let products: Product[] = [];
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
			{#each products as product}
				<ResourceCard {product} />
			{/each}
		{/if}
	</div>
</div>
