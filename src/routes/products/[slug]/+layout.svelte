<script lang="ts">
	let { children } = $props();
	import { page } from '$app/stores';
	import { productsStore } from '$lib/stores/dummy-products';
	import type { Product } from '$lib/stores/dummy-products';

	// Use $derived.by to handle the store subscription
	const product: Product | null = $derived.by(() => {
		const currentPage = $page;
		const slug = currentPage.params.slug;
		return slug ? productsStore.getBySlug(slug) || null : null;
	});
</script>

<svelte:head>
	{#if product}
		<title>{product.title} — CBE Resources</title>
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

{@render children?.()}
