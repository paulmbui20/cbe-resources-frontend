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
			const response = await fetch(url, config);
			const data = await response.json();

			return {
				data: response.ok ? data : undefined,
				message: data.message,
				errors: data.errors,
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
		// Use TokenObtainPairView endpoint to obtain access/refresh pair
		// TokenObtainPairView expects 'username' by default. If your backend accepts email, it may accept 'email'.
		const payload: any = { password };
		if (identifier.includes('@')) payload.email = identifier;
		else payload.username = identifier;

		return this.post('/accounts/api/token/', payload);
	}

	async logout(refresh?: string): Promise<ApiResponse> {
		// If a refresh token is provided, send it in the body; otherwise rely on cookie
		const body = refresh ? { refresh } : {};
		return this.post('/accounts/api/accounts/logout/', body);
	}

	async refreshToken(refresh?: string): Promise<ApiResponse> {
		// If refresh provided, send it in the body. Otherwise, call with empty body and
		// rely on httpOnly cookie set by backend (if implemented).
		const body = refresh ? { refresh } : {};
		return this.post('/accounts/api/token/refresh/', body);
	}

	async verifyToken(token: string): Promise<ApiResponse> {
		return this.post('/accounts/api/token/verify/', { token });
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
}

export const apiService = new ApiService();
