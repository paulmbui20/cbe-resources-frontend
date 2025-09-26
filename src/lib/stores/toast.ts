import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	id: string;
	type: ToastType;
	title?: string;
	message: string;
	duration?: number;
	dismissible?: boolean;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (toast: Omit<Toast, 'id'>) => {
			const id = Math.random().toString(36).substring(2, 9);
			const newToast: Toast = {
				id,
				duration: 5000,
				dismissible: true,
				...toast
			};

			update((toasts) => [...toasts, newToast]);

			// Auto-remove toast after duration
			if (newToast.duration && newToast.duration > 0) {
				setTimeout(() => {
					toastStore.remove(id);
				}, newToast.duration);
			}

			return id;
		},
		remove: (id: string) => {
			update((toasts) => toasts.filter((toast) => toast.id !== id));
		},
		clear: () => {
			update(() => []);
		},
		success: (message: string, title?: string) => {
			return toastStore.add({ type: 'success', message, title });
		},
		error: (message: string, title?: string) => {
			return toastStore.add({
				type: 'error',
				message,
				title,
				duration: 7000 // Longer duration for errors
			});
		},
		info: (message: string, title?: string) => {
			return toastStore.add({ type: 'info', message, title });
		},
		warning: (message: string, title?: string) => {
			return toastStore.add({ type: 'warning', message, title });
		}
	};
}

export const toastStore = createToastStore();
