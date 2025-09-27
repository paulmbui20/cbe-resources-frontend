import { writable } from 'svelte/store';
import { apiService } from '../api';
import { toastStore } from './toast';
import { goto } from '$app/navigation';

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
		// Called by ApiService when refresh fails to ensure a secure logout flow
		async handleAuthFailure(message?: string) {
			const state: AuthState = {
				user: null,
				access: null,
				isAuthenticated: false
			};
			persist(state);
			set(state);
			try {
				toastStore.info(message ?? 'Your session has expired. Please sign in again.');
			} catch (e) {
				console.debug('Failed to show toast on auth failure', e);
			}
			// Redirect to login page
			try {
				goto('/login');
			} catch (e) {
				console.debug('Redirect to login failed', e);
			}
		},
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
					// Attempt to load fresh profile from server if not present
					if (!user) {
						try {
							await auth.loadProfile();
						} catch (e) {
							console.debug('Failed to load profile after register', e);
						}
					}
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
					// If backend didn't include user object, fetch profile
					if (!user) {
						try {
							await auth.loadProfile();
						} catch (e) {
							console.debug('Failed to load profile after login', e);
						}
					}
				}
				return res;
			} catch (error) {
				console.error('Login error:', error);
				throw error; // Let the UI handle the error display
			}
		},
		async logout() {
			const refresh =
				typeof window !== 'undefined' ? sessionStorage.getItem('refresh_token') : null;
			try {
				await apiService.logout(refresh ?? undefined);
			} catch (error) {
				// Log but continue to clear local state to avoid leaving the client in an inconsistent auth state
				console.error('Logout request error (server):', error);
			}
			const state: AuthState = {
				user: null,
				access: null,
				isAuthenticated: false
			};
			persist(state);
			set(state);
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
					// Reset server refresh attempts counter in apiService
					try {
						(apiService as any).resetRefreshAttempts?.();
					} catch (e) {
						console.debug('Failed to reset apiService refresh attempts', e);
					}
					return res;
				} else {
					// refresh did not succeed — invoke common handler to clear state + redirect
					if ((auth as any).handleAuthFailure) {
						(auth as any).handleAuthFailure('Session expired. Please sign in again.');
					}
					return res;
				}
			} catch (error) {
				console.error('Token refresh error:', error);
				// On refresh error, ensure common handler is used to clear state and redirect
				try {
					(auth as any).handleAuthFailure?.('Session expired. Please sign in again.');
				} catch (e) {
					console.debug('handleAuthFailure failed', e);
				}
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

// Register apiService onAuthFailure callback to the auth store's handler
if (typeof window !== 'undefined') {
	apiService.setOnAuthFailure(() => {
		// Use a small timeout to ensure stores are ready in hydration
		setTimeout(() => {
			// import the store and call the handler
			try {
				// auth is already exported
				(auth as any).handleAuthFailure?.();
			} catch (e) {
				console.debug('Failed to invoke auth.handleAuthFailure', e);
			}
		}, 10);
	});
}
