import { writable } from 'svelte/store';
import type { Product } from './dummy-products';

export type QuickCheckoutData = {
	product?: Product | null;
	phone?: string;
	email?: string;
};

const { subscribe, set, update } = writable<QuickCheckoutData>({ product: null });

export const quickCheckout = {
	subscribe,
	setProduct: (p: Product) => set({ product: p }),
	setContact: (phone: string, email: string) => update((s) => ({ ...s, phone, email })),
	clear: () => set({ product: null })
};
