import type { PageLoad } from './$types';
import { productsStore } from '$lib/stores/dummy-products';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	// productsStore is an in-memory store; call helper to retrieve product data
	const product = (productsStore as any).getBySlug ? (productsStore as any).getBySlug(slug) : null;
	if (!product) {
		return { status: 404 } as any;
	}

	return { product } as any;
};
