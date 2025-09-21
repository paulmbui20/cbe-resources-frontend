import { writable } from 'svelte/store';

// Progress value 0-100
export const navProgress = (() => {
	const { subscribe, set, update } = writable(0);

	let timer: ReturnType<typeof setTimeout> | null = null;

	function start() {
		set(8);
		if (timer) clearInterval(timer as any);
		timer = setInterval(() => {
			update((n) => {
				if (n >= 90) return n;
				return n + Math.random() * 8;
			});
		}, 200);
	}

	function done() {
		if (timer) {
			clearInterval(timer as any);
			timer = null;
		}
		set(100);
		// hide after a short delay
		setTimeout(() => set(0), 300);
	}

	return { subscribe, start, done, set };
})();
