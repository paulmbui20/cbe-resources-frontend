<!-- src/routes/accounts/password-reset/verify-otp/+page.svelte -->
<script lang="ts">
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { goto } from '$app/navigation';

	let email = '';
	let otp = '';
	let loading = false;

	// Auto-format OTP input (add spaces for readability)
	function formatOtp(value: string) {
		return value
			.replace(/\s/g, '')
			.replace(/(.{3})/g, '$1 ')
			.trim();
	}

	function handleOtpInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const rawValue = target.value.replace(/\s/g, '');
		if (rawValue.length <= 6) {
			otp = rawValue;
			target.value = formatOtp(rawValue);
		}
	}

	async function submit() {
		if (!email || !otp) {
			toastStore.error('Please fill in all fields');
			return;
		}

		loading = true;
		try {
			const res = await apiService.post('/accounts/api/password-reset/verify-otp/', {
				email,
				otp: otp.replace(/\s/g, '')
			});
			if (res.status === 200) {
				toastStore.success('OTP verified. You can now set a new password.');
				goto('/accounts/password-reset/confirm');
			} else {
				toastStore.error(res.message || 'OTP verification failed.');
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
	<title>Verify OTP</title>
</svelte:head>

<div class="space-y-6">
	<div class="text-center">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Verify OTP</h1>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
			Enter the 6-digit code sent to your email address along with your email.
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

		<div>
			<label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Verification Code
			</label>
			<div class="mt-1">
				<input
					id="otp"
					type="text"
					on:input={handleOtpInput}
					required
					maxlength="7"
					placeholder="000 000"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-center font-mono text-lg tracking-widest text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
				/>
			</div>
			<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
				Check your email for the 6-digit verification code
			</p>
		</div>

		<button
			type="submit"
			disabled={loading || !email || otp.length < 6}
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
				Verifying...
			{:else}
				Verify Code
			{/if}
		</button>
	</form>

	<div class="text-center">
		<p class="text-sm text-gray-600 dark:text-gray-400">
			Didn't receive the code?
			<a
				href="/accounts/password-reset"
				class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
			>
				Send again
			</a>
		</p>
	</div>
</div>
