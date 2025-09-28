import { writable } from 'svelte/store';

export const csrf = writable<string | null>(null);

export function setCsrf(token: string | null) {
	csrf.set(token);
}

export default csrf;
