<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import type { Product } from '$lib/stores/dummy-products';
	import { cart } from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { quickCheckout } from '$lib/stores/quickCheckout';

	export let product: Product;

	function addToCart() {
		// cart.addItem expects CartItem shape; cart store is permissive for dummy data
		cart.addItem({
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			type: product.type
		});
	}
</script>

<Card class="p-4">
	<h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
		<a href={`/products/${product.slug}`} class="hover:underline">{product.title}</a>
	</h5>
	<p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
		{product.description}
	</p>
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
			<span class="capitalize">{product.type}</span>
			{#if product.subject}
				<span>•</span>
				<span>{product.subject}</span>
			{/if}
			{#if product.level}
				<span>•</span>
				<span>{product.level}</span>
			{/if}
		</div>
		<p class="text-lg font-bold text-gray-900 dark:text-white">Ksh. {product.price}</p>

		<div class="flex items-center justify-between">
			<div class="flex gap-2">
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
					on:click={addToCart}
				>
					Add to Cart
				</button>
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm font-medium text-gray-800"
					on:click={() => {
						quickCheckout.setProduct(product);
						goto('/checkout/quick');
					}}
				>
					Buy Now
				</button>
			</div>
		</div>
	</div>
</Card>
