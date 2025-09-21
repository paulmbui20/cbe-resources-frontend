import { writable } from 'svelte/store';

export interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image?: string;
	type: 'note' | 'scheme' | 'exam' | 'revision' | 'curriculum' | 'report' | 'lesson';
}

interface CartStore {
	items: CartItem[];
	total: number;
	itemCount: number;
}

function calculateTotal(items: CartItem[]): number {
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateItemCount(items: CartItem[]): number {
	return items.reduce((sum, item) => sum + item.quantity, 0);
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartStore>({
		items: [],
		total: 0,
		itemCount: 0
	});

	return {
		subscribe,
		addItem: (item: Omit<CartItem, 'quantity'>) => {
			update((store) => {
				const existingItem = store.items.find((i) => i.id === item.id);

				if (existingItem) {
					existingItem.quantity += 1;
					return {
						...store,
						items: store.items,
						total: calculateTotal(store.items),
						itemCount: calculateItemCount(store.items)
					};
				}

				const newItems = [...store.items, { ...item, quantity: 1 }];
				return {
					...store,
					items: newItems,
					total: calculateTotal(newItems),
					itemCount: calculateItemCount(newItems)
				};
			});
		},
		removeItem: (id: string) => {
			update((store) => {
				const newItems = store.items.filter((item) => item.id !== id);
				return {
					...store,
					items: newItems,
					total: calculateTotal(newItems),
					itemCount: calculateItemCount(newItems)
				};
			});
		},
		updateQuantity: (id: string, quantity: number) => {
			update((store) => {
				const item = store.items.find((i) => i.id === id);
				if (item) {
					item.quantity = Math.max(0, quantity);
					if (item.quantity === 0) {
						return {
							...store,
							items: store.items.filter((i) => i.id !== id),
							total: calculateTotal(store.items.filter((i) => i.id !== id)),
							itemCount: calculateItemCount(store.items.filter((i) => i.id !== id))
						};
					}
				}
				return {
					...store,
					total: calculateTotal(store.items),
					itemCount: calculateItemCount(store.items)
				};
			});
		},
		clearCart: () => {
			set({
				items: [],
				total: 0,
				itemCount: 0
			});
		}
	};
}

export const cart = createCartStore();
