<!-- src/routes/accounts/password-reset/+page.svelte -->
<script lang="ts">
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { goto } from '$app/navigation';

	let email = '';
	let loading = false;

	async function submit() {
		loading = true;
		try {
			const res = await apiService.post('/accounts/api/password-reset/request/', { email });
			if (res.status === 200) {
				toastStore.success('If your email is registered, you will receive a password reset OTP.');
				// navigate to verify page where user can input OTP
				goto('/accounts/password-reset/verify-otp');
			} else {
				toastStore.error(res.message || 'Failed to request password reset.');
			}
		} catch (e) {
			console.error(e);
			toastStore.error('Network error. Please try again.');
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<div class="space-y-6">
	<div class="text-center">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
			Enter the email associated with your account and we'll send you an OTP to reset your password.
		</p>
	</div>

	<form on:submit|preventDefault={submit} class="space-y-4">
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Email address
			</label>
			<div class="mt-1">
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					placeholder="Enter your email"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
				/>
			</div>
		</div>

		<button
			type="submit"
			disabled={loading}
			class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800"
		>
			{#if loading}
				<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
						fill="none"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
					></path>
				</svg>
				Sending OTP...
			{:else}
				Send Reset OTP
			{/if}
		</button>
	</form>

	<div class="text-center text-sm text-gray-600 dark:text-gray-400">
		Remember your password?
		<a
			href="/login"
			class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
		>
			Sign in here
		</a>
	</div>
</div>
