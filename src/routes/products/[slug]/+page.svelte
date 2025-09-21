<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { productsStore } from '$lib/stores/dummy-products';
	import type { Product } from '$lib/stores/dummy-products';
	import { cart } from '$lib/stores/cart';
	import { quickCheckout } from '$lib/stores/quickCheckout';
	import Breadcrumbs from '../../../components/breadcrumbs.svelte';
	import { goto } from '$app/navigation';

	let product: Product | null = null;
	$: slug = $page.params.slug;

	onMount(() => {
		const p = (productsStore as any).getBySlug ? (productsStore as any).getBySlug(slug) : null;
		product = p || null;
	});
</script>

{#if product}
	<div class="container mx-auto px-4 py-6">
		<Breadcrumbs />
		<div class="grid gap-6 md:grid-cols-3">
			<div class="md:col-span-2">
				<h1 class="text-2xl font-bold">{product.title}</h1>
				<p class="mt-2 text-gray-600">{product.description}</p>
			</div>
			<div class="rounded bg-white p-4 shadow">
				<div class="text-lg font-bold">Ksh. {product.price}</div>
				<div class="mt-4 flex gap-2">
					<button
						class="rounded bg-primary-600 px-3 py-1 text-white"
						on:click={() => {
							cart.addItem({
								id: product!.id,
								title: product!.title,
								price: product!.price,
								type: 'product'
							} as any);
							goto('/cart');
						}}
					>
						Add to Cart
					</button>
					<button
						class="rounded border px-3 py-1"
						on:click={() => {
							quickCheckout.setProduct(product!);
							goto('/checkout/quick');
						}}
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container mx-auto px-4 py-6">Product not found.</div>
{/if}
