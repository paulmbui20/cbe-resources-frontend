import { writable } from 'svelte/store';
import { apiService } from '../api';

export interface User {
	id: number;
	username: string;
	email: string;
	// Add other user fields as needed
}

export interface AuthState {
	user: User | null;
	access: string | null;
	isAuthenticated: boolean;
}

const initial: AuthState = {
	user: null,
	// Access token in sessionStorage for SPA routing
	access: typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null,
	isAuthenticated: false
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initial);

	const persist = (state: AuthState) => {
		if (typeof window === 'undefined') return;
		if (state.access) sessionStorage.setItem('access_token', state.access);
		else sessionStorage.removeItem('access_token');
		// If backend returns a refresh token in the response (non-httpOnly), persist it
		// NOTE: prefer httpOnly cookies from backend for refresh tokens; storing refresh in JS is less secure
		if ((state as any).refresh) {
			sessionStorage.setItem('refresh_token', (state as any).refresh);
		} else {
			sessionStorage.removeItem('refresh_token');
		}
	};

	return {
		subscribe,
		set,
		async register(payload: any) {
			try {
				const res = await apiService.register(payload);
				if (res.status === 201 && res.data) {
					// backend may return tokens nested or at top-level
					const data = res.data as any;
					const tokens = data.tokens ?? { access: data.access, refresh: data.refresh };
					const user = data.user ?? null;
					const state: AuthState = {
						user,
						access: tokens?.access ?? null,
						isAuthenticated: !!tokens?.access
					};
					if (tokens?.refresh) {
						(state as any).refresh = tokens.refresh;
						console.debug('Persisting refresh token from register');
					}
					persist(state);
					set(state);
				}
				return res;
			} catch (error) {
				console.error('Registration error:', error);
				throw error; // Let the UI handle the error display
			}
		},
		async login(identifier: string, password: string) {
			try {
				const res = await apiService.login(identifier, password);
				if (res.status === 200 && res.data) {
					const data = res.data as any;
					const tokens = data.tokens ?? { access: data.access, refresh: data.refresh };
					const user = data.user ?? null;
					const state: AuthState = {
						user,
						access: tokens?.access ?? null,
						isAuthenticated: !!tokens?.access
					};
					if (tokens?.refresh) {
						(state as any).refresh = tokens.refresh;
						console.debug('Persisting refresh token from login');
					}
					persist(state);
					set(state);
				}
				return res;
			} catch (error) {
				console.error('Login error:', error);
				throw error; // Let the UI handle the error display
			}
		},
		async logout() {
			try {
				// If we have a non-httpOnly refresh token, send it to logout endpoint so backend can blacklist it
				const refresh =
					typeof window !== 'undefined' ? sessionStorage.getItem('refresh_token') : null;
				await apiService.logout(refresh ?? undefined);
				const state: AuthState = {
					user: null,
					access: null,
					isAuthenticated: false
				};
				persist(state);
				set(state);
			} catch (error) {
				console.error('Logout error:', error);
				throw error;
			}
		},
		async refresh() {
			try {
				// Prefer sending a stored refresh token if backend expects it in the body (non-httpOnly flows)
				const storedRefresh =
					typeof window !== 'undefined' ? sessionStorage.getItem('refresh_token') : null;
				const res = await apiService.refreshToken(storedRefresh ?? undefined);
				if (res.status === 200 && res.data) {
					const access = res.data.access ?? null;
					update((s) => {
						const next = {
							...s,
							access,
							isAuthenticated: !!access
						};
						// If server returns a refresh token refresh it in storage
						if (res.data.refresh) (next as any).refresh = res.data.refresh;
						persist(next);
						return next;
					});
				}
				return res;
			} catch (error) {
				console.error('Token refresh error:', error);
				// On refresh failure, clear the auth state
				const state: AuthState = {
					user: null,
					access: null,
					isAuthenticated: false
				};
				persist(state);
				set(state);
				throw error;
			}
		},
		async loadProfile() {
			const res = await apiService.getProfile();
			if (res.status === 200 && res.data) {
				update((s) => ({ ...s, user: res.data }));
			}
			return res;
		}
	};
}

export const auth = createAuthStore();
