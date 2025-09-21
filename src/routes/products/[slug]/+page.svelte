<script lang="ts">
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart';
	import { quickCheckout } from '$lib/stores/quickCheckout';
	import Breadcrumbs from '../../../components/breadcrumbs.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	const product = data.product as any;
</script>

<svelte:head>
	{#if product}
		<title>{product.title} — CBE Resources</title>
		<meta name="description" content={product.description} />
		<meta property="og:title" content={product.title} />
		<meta property="og:description" content={product.description} />
		{#if product.image}
			<meta property="og:image" content={product.image} />
		{/if}
		<script type="application/ld+json">
			{JSON.stringify({
				'@context': 'https://schema.org/',
				'@type': 'Product',
				name: product.title,
				image: product.image ? [product.image] : undefined,
				description: product.description,
				sku: product.id,
				offers: {
					'@type': 'Offer',
					priceCurrency: 'KES',
					price: product.price
				}
			})}
		</script>
	{/if}
</svelte:head>

{#if product}
	<div class="container mx-auto px-4 py-6">
		<Breadcrumbs />
		<div class="grid gap-6 md:grid-cols-3">
			<div class="md:col-span-2">
				<h1 class="text-2xl font-bold text-gray-600 dark:text-gray-300">{product.title}</h1>
				<p class="mt-2 text-gray-600 dark:text-gray-300">{product.description}</p>
			</div>
			<div class="rounded bg-white p-4 shadow dark:bg-gray-800">
				<div class="text-lg font-bold text-gray-800 dark:text-gray-300">
					<strong>Price</strong> Ksh. {product.price}
				</div>
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
						class="rounded border bg-green-600 px-3 py-1"
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
