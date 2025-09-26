<!-- +page.svelte -->
<script lang="ts">
	import { Section, Contact } from 'flowbite-svelte-blocks';
	import { Label, Input, Textarea, Button, Select } from 'flowbite-svelte';
	import { toastStore } from '$lib/stores/toast';
	import { apiService, type ContactFormData } from '$lib/api';

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

<Section name="contact" class="mx-auto max-w-4xl py-12">
	<Contact>
		{#snippet h2()}Contact Us{/snippet}
		{#snippet paragraph()}Got a technical issue? Want to send feedback about a beta feature? Need
			details about our Business plan? Let us know.{/snippet}

		<form class="space-y-8" on:submit={handleSubmit}>
			<div>
				<Label for="full_name" class="mb-2 block">Full Name *</Label>
				<Input
					id="full_name"
					name="full_name"
					bind:value={formData.full_name}
					placeholder="John Doe"
					required
					disabled={isSubmitting}
				/>
			</div>

			<div>
				<Label for="email" class="mb-2 block">Your email *</Label>
				<Input
					id="email"
					name="email"
					type="email"
					bind:value={formData.email}
					placeholder="name@example.com"
					required
					disabled={isSubmitting}
				/>
			</div>

			<div>
				<Label for="phone" class="mb-2 block">Phone Number</Label>
				<Input
					id="phone"
					name="phone"
					type="tel"
					bind:value={formData.phone}
					placeholder="+254712345678"
					disabled={isSubmitting}
				/>
			</div>

			<div>
				<Label for="priority" class="mb-2 block">Priority</Label>
				<Select
					id="priority"
					name="priority"
					bind:value={formData.priority}
					items={priorityOptions}
					disabled={isSubmitting}
				/>
			</div>

			<div>
				<Label for="message" class="mb-2 block">Your message *</Label>
				<Textarea
					class="w-full"
					id="message"
					name="message"
					bind:value={formData.message}
					placeholder="Leave a comment..."
					required
					disabled={isSubmitting}
					rows={6}
				/>
				<p class="mt-1 text-sm text-gray-500">Minimum 10 characters</p>
			</div>

			<Button type="submit" disabled={isSubmitting} class="w-full sm:w-auto">
				{isSubmitting ? 'Sending...' : 'Send message'}
			</Button>
		</form>
	</Contact>
</Section>
