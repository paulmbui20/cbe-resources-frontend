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

		const config: RequestInit = {
			...options,
			headers: {
				...defaultHeaders,
				...options.headers
			}
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
}

export const apiService = new ApiService();
