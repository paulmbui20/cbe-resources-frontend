<!-- src/routes/accounts/password-reset/confirm/+page.svelte -->
<script lang="ts">
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { goto } from '$app/navigation';

	let email = '';
	let otp = '';
	let new_password = '';
	let confirm_password = '';
	let loading = false;
	let showPassword = false;
	let showConfirmPassword = false;

	// Password strength indicator
	function getPasswordStrength(password: string): { score: number; text: string; color: string } {
		if (password.length === 0) return { score: 0, text: '', color: '' };

		let score = 0;
		if (password.length >= 8) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[a-z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[^A-Za-z0-9]/.test(password)) score++;

		const levels = [
			{ text: 'Very Weak', color: 'text-red-600' },
			{ text: 'Weak', color: 'text-red-500' },
			{ text: 'Fair', color: 'text-yellow-500' },
			{ text: 'Good', color: 'text-green-500' },
			{ text: 'Strong', color: 'text-green-600' }
		];

		return { score, ...levels[Math.min(score, 4)] };
	}

	$: passwordStrength = getPasswordStrength(new_password);
	$: passwordsMatch = new_password === confirm_password && new_password.length > 0;

	function validate() {
		if (!email || !otp || !new_password || !confirm_password) {
			toastStore.error('Please fill in all fields');
			return false;
		}
		if (new_password !== confirm_password) {
			toastStore.error('Passwords do not match');
			return false;
		}
		if (new_password.length < 8) {
			toastStore.error('Password must be at least 8 characters');
			return false;
		}
		return true;
	}

	async function submit() {
		if (!validate()) return;
		loading = true;
		try {
			const res = await apiService.post('/accounts/api/password-reset/confirm/', {
				email,
				otp: otp.replace(/\s/g, ''),
				new_password,
				confirm_password
			});
			if (res.status === 200) {
				toastStore.success('Password reset successful. You can now sign in.');
				goto('/login');
			} else {
				toastStore.error(res.message || 'Password reset failed');
			}
		} catch (e) {
			console.error(e);
			toastStore.error('Network error. Please try again.');
		} finally {
			loading = false;
		}
	}

	// Auto-format OTP input
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
</script>

<svelte:head>
	<title>Set New Password</title>
</svelte:head>

<div class="space-y-6">
	<div class="text-center">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Set new password</h1>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
			Enter your details and choose a strong new password for your account.
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
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-center font-mono tracking-widest text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
				/>
			</div>
		</div>

		<div>
			<label for="new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				New password
			</label>
			<div class="relative mt-1">
				<input
					id="new_password"
					type={showPassword ? 'text' : 'password'}
					bind:value={new_password}
					required
					placeholder="Enter new password"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
				/>
				<button
					type="button"
					class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
							/>
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					{/if}
				</button>
			</div>
			{#if new_password.length > 0}
				<div class="mt-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium {passwordStrength.color}">
							Password strength: {passwordStrength.text}
						</span>
						<span class="text-xs text-gray-500 dark:text-gray-400">
							{passwordStrength.score}/5
						</span>
					</div>
					<div class="mt-1 flex space-x-1">
						{#each Array(5) as _, i}
							<div
								class="h-1 flex-1 rounded-full {i < passwordStrength.score
									? passwordStrength.color.replace('text-', 'bg-')
									: 'bg-gray-200 dark:bg-gray-600'}"
							></div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<div>
			<label
				for="confirm_password"
				class="block text-sm font-medium text-gray-700 dark:text-gray-300"
			>
				Confirm new password
			</label>
			<div class="relative mt-1">
				<input
					id="confirm_password"
					type={showConfirmPassword ? 'text' : 'password'}
					bind:value={confirm_password}
					required
					placeholder="Confirm new password"
					class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
				/>
				<button
					type="button"
					class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
					on:click={() => (showConfirmPassword = !showConfirmPassword)}
				>
					{#if showConfirmPassword}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
							/>
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					{/if}
				</button>
			</div>
			{#if confirm_password.length > 0}
				<div class="mt-1 flex items-center text-xs">
					{#if passwordsMatch}
						<svg class="mr-1 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-green-600 dark:text-green-400">Passwords match</span>
					{:else}
						<svg class="mr-1 h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-red-600 dark:text-red-400">Passwords don't match</span>
					{/if}
				</div>
			{/if}
		</div>

		<button
			type="submit"
			disabled={loading || !passwordsMatch || passwordStrength.score < 2}
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
				Resetting Password...
			{:else}
				Reset Password
			{/if}
		</button>
	</form>

	<div class="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
		<div class="text-sm text-blue-700 dark:text-blue-300">
			<strong>Password Requirements:</strong>
			<ul class="mt-2 list-inside list-disc space-y-1 text-xs">
				<li>At least 8 characters long</li>
				<li>Include uppercase and lowercase letters</li>
				<li>Include at least one number</li>
				<li>Include at least one special character</li>
			</ul>
		</div>
	</div>
</div>
