export interface ApiResponse<T = any> {
	data?: T;
	message?: string;
	errors?: Record<string, string[]>;
	status: number;
}

export interface ContactFormData {
	full_name: string;
	email: string;
	phone: string;
	message: string;
	priority: 'normal' | 'urgent' | 'critical';
}

class ApiService {
	private baseUrl: string;
	// single refresh promise to avoid concurrent refreshes
	private refreshing: Promise<boolean> | null = null;
	// Optional callback invoked when token refresh fails (so app can logout/redirect)
	private onAuthFailure: (() => void) | null = null;

	// Track refresh attempts to avoid hammering the backend
	private refreshAttempts: number = 0;
	private readonly maxRefreshAttempts: number = 3;

	constructor() {
		// In Svelte, environment variables are accessed through $env/static/public
		this.baseUrl = import.meta.env.VITE_API_BASE_URL;
	}

	private async makeRequest<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;

		const defaultHeaders = {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};

		// Attach auth header if access token present in sessionStorage
		const access = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;

		const authHeader = access ? { Authorization: `Bearer ${access}` } : {};

		// Build a Headers object to satisfy TypeScript's HeadersInit
		const headers = new Headers();
		Object.entries(defaultHeaders).forEach(([k, v]) => headers.set(k, String(v)));

		if (authHeader && (authHeader as any).Authorization) {
			headers.set('Authorization', (authHeader as any).Authorization);
		}

		// Merge any headers provided in options (Headers | string[][] | Record<string, string>)
		if (options.headers) {
			const h = options.headers as any;
			if (h instanceof Headers) {
				h.forEach((value: string, key: string) => headers.set(key, value));
			} else if (Array.isArray(h)) {
				h.forEach(([key, value]: [string, string]) => headers.set(key, value));
			} else if (typeof h === 'object') {
				Object.entries(h).forEach(([k, v]) => headers.set(k, String(v)));
			}
		}

		const config: RequestInit = {
			...options,
			headers,
			// include cookies for cross-site requests if backend sets them
			credentials: 'include'
		};

		try {
			let response = await fetch(url, config);
			let data: any = {};
			try {
				data = await response.json();
			} catch (e) {
				// ignore json parse errors for empty responses
			}

			// If unauthorized, attempt token refresh once and retry
			if (response.status === 401) {
				// avoid infinite loops
				const alreadyRetried = (options as any)._retried;
				if (!alreadyRetried) {
					const refreshResult = await this.attemptRefresh();
					if (refreshResult) {
						// set retried flag and re-run request with updated access token
						const newAccess =
							typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;
						if (newAccess) {
							// update headers
							(config.headers as Headers).set('Authorization', `Bearer ${newAccess}`);
						}
						(options as any)._retried = true;
						response = await fetch(url, config);
						try {
							data = await response.json();
						} catch (e) {}
					}
				}
			}

			return {
				data: response.ok ? data : undefined,
				message: data?.message,
				errors: data?.errors,
				status: response.status
			};
		} catch (error) {
			console.error('API request failed:', error);
			return {
				message: 'Network error occurred. Please try again.',
				status: 0
			};
		}
	}

	// Attempt to refresh tokens using stored refresh token. Returns true if refresh succeeded.
	private async attemptRefresh(): Promise<boolean> {
		// If we've exceeded the allowed number of refresh attempts, refuse to try again
		if (this.refreshAttempts >= this.maxRefreshAttempts) {
			console.warn('Max refresh attempts exceeded; invoking auth failure handler');
			// ensure tokens are cleared
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem('access_token');
				sessionStorage.removeItem('refresh_token');
			}
			try {
				this.onAuthFailure && this.onAuthFailure();
			} catch (e) {
				console.debug('onAuthFailure handler errored', e);
			}
			return false;
		}

		// If a refresh is already in progress, await it
		if (this.refreshing) return this.refreshing;

		this.refreshing = (async () => {
			try {
				const storedRefresh =
					typeof window !== 'undefined' ? sessionStorage.getItem('refresh_token') : null;

				const url = `${this.baseUrl}/accounts/api/token/refresh/`;
				const headers = new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/json'
				});

				const body = storedRefresh
					? JSON.stringify({ refresh: storedRefresh })
					: JSON.stringify({});

				const resp = await fetch(url, { method: 'POST', headers, body, credentials: 'include' });
				if (!resp) return false;
				let parsed: any = {};
				try {
					parsed = await resp.json();
				} catch (e) {}

				if (resp.status === 200 && parsed?.access) {
					// persist access and refresh if present
					if (typeof window !== 'undefined') {
						sessionStorage.setItem('access_token', parsed.access);
						if (parsed.refresh) sessionStorage.setItem('refresh_token', parsed.refresh);
					}
					// reset failed attempts counter on success
					this.refreshAttempts = 0;
					return true;
				}
				// refresh failed: clear tokens
				if (typeof window !== 'undefined') {
					sessionStorage.removeItem('access_token');
					sessionStorage.removeItem('refresh_token');
				}
				// increment attempts counter and notify if we've hit the limit
				this.refreshAttempts = Math.min(this.refreshAttempts + 1, this.maxRefreshAttempts);
				if (this.refreshAttempts >= this.maxRefreshAttempts) {
					console.warn('Reached maximum refresh attempts during refresh');
					try {
						this.onAuthFailure && this.onAuthFailure();
					} catch (e) {
						console.debug('onAuthFailure handler errored', e);
					}
				}
				// notify application that refresh failed so it can perform logout/redirect
				try {
					this.onAuthFailure && this.onAuthFailure();
				} catch (e) {
					console.debug('onAuthFailure handler errored', e);
				}
				return false;
			} catch (e) {
				console.debug('Token refresh failed', e);
				if (typeof window !== 'undefined') {
					sessionStorage.removeItem('access_token');
					sessionStorage.removeItem('refresh_token');
				}
				// increment attempts counter and notify if we've hit the limit
				this.refreshAttempts = Math.min(this.refreshAttempts + 1, this.maxRefreshAttempts);
				if (this.refreshAttempts >= this.maxRefreshAttempts) {
					try {
						this.onAuthFailure && this.onAuthFailure();
					} catch (err) {
						console.debug('onAuthFailure handler errored', err);
					}
				} else {
					// invoke handler on intermittent failures too to allow UI to react if needed
					try {
						this.onAuthFailure && this.onAuthFailure();
					} catch (err) {
						console.debug('onAuthFailure handler errored', err);
					}
				}
				return false;
			} finally {
				this.refreshing = null;
			}
		})();

		return this.refreshing;
	}

	// Allow the app to register a callback which will be invoked when refresh fails.
	setOnAuthFailure(fn: (() => void) | null) {
		this.onAuthFailure = fn;
	}

	// Reset the refresh attempts counter (useful after a successful manual refresh)
	resetRefreshAttempts() {
		this.refreshAttempts = 0;
	}

	async submitContact(formData: ContactFormData): Promise<ApiResponse> {
		return this.makeRequest('/api/contact/', {
			method: 'POST',
			body: JSON.stringify(formData)
		});
	}

	// // Add other API methods as needed
	// async get<T>(endpoint: string): Promise<ApiResponse<T>> {
	// 	return this.makeRequest(endpoint, { method: 'GET' });
	// }

	async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
		return this.makeRequest(endpoint, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	// --- Auth related helpers ---
	async register(data: any): Promise<ApiResponse> {
		return this.post('/accounts/api/register/', data);
	}

	async login(identifier: string, password: string): Promise<ApiResponse> {
		// This app now uses email-only login
		const payload: any = { email: identifier, password };
		return this.post('/accounts/api/token/', payload);
	}

	async logout(refresh?: string): Promise<ApiResponse> {
		// If a refresh token is provided, backend expects it under `refresh_token` field.
		// If not available, call the 'logout-all' endpoint to blacklist outstanding tokens.
		if (refresh) {
			const body = { refresh_token: refresh };
			return this.post('/accounts/api/logout/', body);
		} else {
			// No refresh token in JS storage — attempt server-side logout-all which blacklists all tokens
			return this.post('/accounts/api/auth/logout-all/', {});
		}
	}

	async refreshToken(refresh?: string): Promise<ApiResponse> {
		// Deprecated: use internal attemptRefresh to avoid recursion. Keep compatibility by
		// calling the refresh endpoint directly here (bypass makeRequest) so callers can still use this method.
		try {
			const body = refresh ? { refresh } : {};
			const url = `${this.baseUrl}/accounts/api/token/refresh/`;
			const headers = new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json'
			});
			const resp = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(body),
				credentials: 'include'
			});
			const data = await resp.json();
			return {
				data: resp.ok ? data : undefined,
				message: data?.message,
				errors: data?.errors,
				status: resp.status
			};
		} catch (e) {
			return { message: 'Network error occurred. Please try again.', status: 0 };
		}
	}

	async verifyToken(token: string): Promise<ApiResponse> {
		return this.post('/accounts/api/token/verify/', { token });
	}

	async verifyEmail(uidb64: string, token: string): Promise<ApiResponse> {
		// This endpoint in backend is GET; client can call it to validate and receive redirect_url
		return this.makeRequest(
			`/accounts/api/verify-email/${encodeURIComponent(uidb64)}/${encodeURIComponent(token)}/`,
			{ method: 'GET' }
		);
	}

	async getProfile(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/profile/', { method: 'GET' });
	}

	async updateProfile(data: any): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/profile/', {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async changePassword(data: any): Promise<ApiResponse> {
		return this.post('/accounts/api/change-password/', data);
	}

	async sendVerification(): Promise<ApiResponse> {
		return this.post('/accounts/api/send-verification/', {});
	}

	async resendVerification(): Promise<ApiResponse> {
		return this.post('/accounts/api/resend-verification/', {});
	}

	async checkUsername(username: string): Promise<ApiResponse> {
		return this.makeRequest(
			`/accounts/api/check-username/?username=${encodeURIComponent(username)}`,
			{ method: 'GET' }
		);
	}

	async checkEmail(email: string): Promise<ApiResponse> {
		return this.makeRequest(`/accounts/api/check-email/?email=${encodeURIComponent(email)}`, {
			method: 'GET'
		});
	}

	async verificationStatus(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/verification-status/', { method: 'GET' });
	}

	// Purchases and downloads for account
	async getPurchases(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/purchases/', { method: 'GET' });
	}

	async getDownloads(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/downloads/', { method: 'GET' });
	}

	async getDashboard(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/dashboard/', { method: 'GET' });
	}

	async getOrders(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/orders/', { method: 'GET' });
	}

	async getPayments(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/payments/', { method: 'GET' });
	}

	async getStats(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/stats/', { method: 'GET' });
	}

	async getDownloadHistory(): Promise<ApiResponse> {
		return this.makeRequest('/accounts/api/download-history/', { method: 'GET' });
	}
}

export const apiService = new ApiService();
