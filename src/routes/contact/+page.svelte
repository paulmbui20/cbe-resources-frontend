<!-- +page.svelte -->
<script lang="ts">
	import { Label, Input, Textarea, Button, Select } from 'flowbite-svelte';
	import { toastStore } from '$lib/stores/toast';
	import { apiService, type ContactFormData } from '$lib/api';
	import { Mail, Phone, MessageSquare, Send, User } from 'lucide-svelte';

	let isSubmitting = false;
	let formData: ContactFormData = {
		full_name: '',
		email: '',
		phone: '',
		message: '',
		priority: 'normal'
	};

	const priorityOptions = [
		{ value: 'normal', name: 'Normal' },
		{ value: 'urgent', name: 'Urgent' },
		{ value: 'critical', name: 'Critical' }
	];

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (isSubmitting) return;

		// Basic client-side validation
		if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
			toastStore.error('Please fill in all required fields');
			return;
		}

		if (formData.message.trim().length < 10) {
			toastStore.error('Message must be at least 10 characters long');
			return;
		}

		isSubmitting = true;

		try {
			const response = await apiService.submitContact(formData);

			if (response.status === 201) {
				toastStore.success(
					response.message || 'Your message has been sent successfully!',
					'Success'
				);

				// Reset form
				formData = {
					full_name: '',
					email: '',
					phone: '',
					message: '',
					priority: 'normal'
				};
			} else {
				// Handle validation errors from Django
				if (response.errors) {
					const errorMessages = Object.values(response.errors).flat().join(', ');
					toastStore.error(errorMessages, 'Validation Error');
				} else {
					toastStore.error(response.message || 'Something went wrong. Please try again.', 'Error');
				}
			}
		} catch (error) {
			console.error('Form submission error:', error);
			toastStore.error(
				'Network error occurred. Please check your connection and try again.',
				'Connection Error'
			);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us - Get in Touch</title>
	<meta
		name="description"
		content="Contact us for support, feedback, or business inquiries. We're here to help."
	/>
</svelte:head>

<!-- Above the fold contact section -->
<div class="min-h-screen">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Left Column - Hero Content and Quick Actions -->
			<div class="lg:col-span-5">
				<!-- Hero Section -->
				<div class="mb-12">
					<h1
						class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
					>
						Get in <span
							class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
							>Touch</span
						>
					</h1>
					<p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
						Have a technical issue? Want to share feedback? Need business details? We're here to
						help and would love to hear from you.
					</p>
				</div>

				<!-- Quick Contact Actions -->
				<div class="space-y-4">
					<!-- Email Button -->
					<a
						href="mailto:info@acerschoolapp.co.ke"
						class="group flex w-full items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30"
						>
							<Mail class="h-6 w-6 text-primary-600 dark:text-primary-400" />
						</div>
						<div class="ml-4 flex-1">
							<h3
								class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
							>
								Email Us
							</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">hello@yourcompany.com</p>
						</div>
						<div class="text-primary-500 opacity-0 transition-opacity group-hover:opacity-100">
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</a>

					<!-- Phone Button -->
					<a
						href="tel:+254746544646"
						class="group flex w-full items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-secondary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-secondary-400"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-100 dark:bg-secondary-900/30"
						>
							<Phone class="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
						</div>
						<div class="ml-4 flex-1">
							<h3
								class="text-lg font-semibold text-gray-900 group-hover:text-secondary-600 dark:text-white dark:group-hover:text-secondary-400"
							>
								Call Us
							</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">+254746544646</p>
						</div>
						<div class="text-secondary-500 opacity-0 transition-opacity group-hover:opacity-100">
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</a>

					<!-- WhatsApp Button -->
					<a
						href="https://wa.me/254746544646?text=Hi%2C%20I%20would%20like%20to%20get%20in%20touch"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex w-full items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-400"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30"
						>
							<MessageSquare class="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<div class="ml-4 flex-1">
							<h3
								class="text-lg font-semibold text-gray-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400"
							>
								WhatsApp
							</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Quick response guaranteed</p>
						</div>
						<div class="text-green-500 opacity-0 transition-opacity group-hover:opacity-100">
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</div>
					</a>
				</div>

				<!-- Response Time Info -->
				<div
					class="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
				>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						<strong class="text-gray-900 dark:text-white">Response Time:</strong> We typically respond
						within 2-4 hours during business hours.
					</p>
				</div>
			</div>

			<!-- Right Column - Contact Form -->
			<div class="lg:col-span-7">
				<div
					class="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl lg:p-12 dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-8">
						<h2 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
							Send us a message
						</h2>
						<p class="mt-2 text-gray-600 dark:text-gray-300">
							Fill out the form below and we'll get back to you soon.
						</p>
					</div>

					<form class="space-y-6" on:submit={handleSubmit}>
						<!-- Name and Email Row -->
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<Label
									for="full_name"
									class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									<div class="flex items-center space-x-2">
										<User class="h-4 w-4" />
										<span>Full Name *</span>
									</div>
								</Label>
								<Input
									id="full_name"
									name="full_name"
									bind:value={formData.full_name}
									placeholder="John Doe"
									required
									disabled={isSubmitting}
									class="w-full rounded-xl border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:disabled:bg-gray-600"
								/>
							</div>

							<div>
								<Label
									for="email"
									class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									<div class="flex items-center space-x-2">
										<Mail class="h-4 w-4" />
										<span>Email Address *</span>
									</div>
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									bind:value={formData.email}
									placeholder="name@example.com"
									required
									disabled={isSubmitting}
									class="w-full rounded-xl border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:disabled:bg-gray-600"
								/>
							</div>
						</div>

						<!-- Phone and Priority Row -->
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<Label
									for="phone"
									class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									<div class="flex items-center space-x-2">
										<Phone class="h-4 w-4" />
										<span>Phone Number</span>
									</div>
								</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									bind:value={formData.phone}
									placeholder="+254712345678"
									disabled={isSubmitting}
									class="w-full rounded-xl border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:disabled:bg-gray-600"
								/>
							</div>

							<div>
								<Label
									for="priority"
									class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Priority Level
								</Label>
								<Select
									id="priority"
									name="priority"
									bind:value={formData.priority}
									items={priorityOptions}
									disabled={isSubmitting}
									class="w-full rounded-xl border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-400 dark:disabled:bg-gray-600"
								/>
							</div>
						</div>

						<!-- Message -->
						<div>
							<Label
								for="message"
								class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<div class="flex items-center space-x-2">
									<MessageSquare class="h-4 w-4" />
									<span>Your Message *</span>
								</div>
							</Label>
							<div class="relative">
								<Textarea
									id="message"
									name="message"
									bind:value={formData.message}
									placeholder="Tell us about your inquiry, feedback, or how we can help you..."
									required
									disabled={isSubmitting}
									rows={6}
									class="w-full resize-none rounded-xl border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-primary-400 dark:disabled:bg-gray-600"
								/>
								<div class="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500">
									{formData.message.length}/10 min
								</div>
							</div>
						</div>

						<!-- Submit Button -->
						<div class="pt-4">
							<Button
								type="submit"
								disabled={isSubmitting}
								class="group relative w-full justify-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-primary-600 hover:to-secondary-600 hover:shadow-xl focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] dark:focus:ring-offset-gray-800"
							>
								<div class="flex items-center space-x-3">
									{#if isSubmitting}
										<div
											class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
										></div>
										<span>Sending...</span>
									{:else}
										<Send class="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
										<span>Send Message</span>
									{/if}
								</div>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
