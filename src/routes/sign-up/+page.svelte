<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';

	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { Eye, EyeOff } from 'lucide-svelte';

	let email = '';
	let username = '';
	let password = '';
	let confirm = '';
	let accepted = false;
	let error = '';
	let showPassword = false;
	let showConfirm = false;

	let isSubmitting = false;

	// Redirect away if already logged in
	import { onMount } from 'svelte';
	onMount(() => {
		let current = null;
		const unsub = auth.subscribe((s) => (current = s.isAuthenticated));
		unsub();
		if (current) {
			toastStore.info('You are already logged in');
			goto('/account');
		}
	});

	async function onSubmit(e: Event) {
		e.preventDefault();
		if (isSubmitting) return;

		error = '';
		// Client-side validation
		if (password !== confirm) {
			toastStore.error('Passwords do not match');
			error = 'Passwords do not match';
			return;
		}
		if (!accepted) {
			toastStore.error('You must accept the Terms and Conditions');
			error = 'You must accept the Terms and Conditions';
			return;
		}

		// check availability before submit
		if (emailAvailable === false) {
			toastStore.error('Email is already registered');
			return;
		}
		if (usernameAvailable === false) {
			toastStore.error('Username is already taken');
			return;
		}

		isSubmitting = true;
		try {
			const res = await auth.register({
				email,
				username,
				password,
				password_confirm: confirm
			});

			if (res.status === 201 || res.status === 200) {
				toastStore.success('Registration successful! Welcome aboard.');
				goto('/account');
			} else {
				if (res.errors) {
					// Show validation errors from backend
					const messages = Object.values(res.errors).flat().join(', ');
					toastStore.error(messages, 'Validation Error');
					error = messages;
				} else {
					toastStore.error(res.message || 'Registration failed', 'Error');
					error = res.message ?? 'Registration failed';
				}
			}
		} catch (e) {
			toastStore.error('Network error occurred. Please try again.');
			error = 'Connection error. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// debounce helper
	function debounce(fn: Function, wait = 400) {
		let t: any;
		return (...args: any[]) => {
			clearTimeout(t);
			t = setTimeout(() => fn(...args), wait);
		};
	}

	import { apiService } from '$lib/api';
	let emailAvailable: boolean | null = null;
	let usernameAvailable: boolean | null = null;

	const checkEmailDebounced = debounce(async (value: string) => {
		if (!value) return (emailAvailable = null);
		try {
			const res = await apiService.checkEmail(value);
			emailAvailable = res.status === 200 ? !!res.data?.available : null;
		} catch (e) {
			emailAvailable = null;
		}
	}, 500);

	const checkUsernameDebounced = debounce(async (value: string) => {
		if (!value) return (usernameAvailable = null);
		try {
			const res = await apiService.checkUsername(value);
			usernameAvailable = res.status === 200 ? !!res.data?.available : null;
		} catch (e) {
			usernameAvailable = null;
		}
	}, 500);

	// watch inputs
	$: if (email) checkEmailDebounced(email);
	$: if (username) checkUsernameDebounced(username);
</script>

<!-- Above the fold registration layout matching contact/login -->
<div class="min-h-screen">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Left hero area -->
			<div class="flex flex-col justify-center lg:col-span-5">
				<div class="mb-6">
					<img class="mb-6 h-10 w-10" src={favicon} alt="logo" />
					<h1
						class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
					>
						Create your account
					</h1>
					<p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
						Join CBC Resources to access materials, save favorites and download instantly.
					</p>
				</div>
			</div>

			<!-- Right column: Register card -->
			<div class="lg:col-span-7">
				<div
					class="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="space-y-4 p-0 sm:p-0 md:space-y-6">
						<form class="flex flex-col space-y-6" on:submit|preventDefault={onSubmit}>
							<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">
								Create an account
							</h3>
							{#if error}
								<div class="text-red-600">{error}</div>
							{/if}
							<div class="grid gap-4 md:grid-cols-2">
								<Label class="space-y-2">
									<span>Username</span>
									<Input
										bind:value={username}
										type="text"
										name="username"
										placeholder="username"
										required
									/>
									{#if usernameAvailable === true}
										<p class="text-sm text-green-600">Username is available</p>
									{:else if usernameAvailable === false}
										<p class="text-sm text-red-600">Username is taken</p>
									{/if}
								</Label>

								<Label class="space-y-2">
									<span>Your email</span>
									<Input
										bind:value={email}
										type="email"
										name="email"
										placeholder="name@company.com"
										required
									/>
									{#if emailAvailable === true}
										<p class="text-sm text-green-600">Email is available</p>
									{:else if emailAvailable === false}
										<p class="text-sm text-red-600">Email is already registered</p>
									{/if}
								</Label>
							</div>
							<Label class="space-y-2">
								<span>Your password</span>
								<div class="relative">
									<Input
										bind:value={password}
										type={showPassword ? 'text' : 'password'}
										name="password"
										placeholder="•••••"
										required
									/>
									<button
										type="button"
										class="absolute top-2 right-2"
										on:click={() => (showPassword = !showPassword)}
										aria-label="Toggle password"
									>
										{#if showPassword}
											<EyeOff class="h-5 w-5 text-gray-600" />
										{:else}
											<Eye class="h-5 w-5 text-gray-600" />
										{/if}
									</button>
								</div>
							</Label>
							<Label class="space-y-2">
								<span>Confirm password</span>
								<div class="relative">
									<Input
										bind:value={confirm}
										type={showConfirm ? 'text' : 'password'}
										name="confirm-password"
										placeholder="•••••"
										required
									/>
									<button
										type="button"
										class="absolute top-2 right-2"
										on:click={() => (showConfirm = !showConfirm)}
										aria-label="Toggle confirm password"
									>
										{#if showConfirm}
											<EyeOff class="h-5 w-5 text-gray-600" />
										{:else}
											<Eye class="h-5 w-5 text-gray-600" />
										{/if}
									</button>
								</div>
							</Label>
							<div class="flex items-start">
								<Checkbox bind:checked={accepted}>
									I accept the <a
										class="font-medium text-primary-600 hover:underline dark:text-primary-500"
										href="/">Terms and Conditions</a
									>
								</Checkbox>
							</div>
							<Button type="submit" class="w-full" disabled={isSubmitting}>
								{#if isSubmitting}
									<svg
										class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Creating account...
								{:else}
									Create an account
								{/if}
							</Button>
							<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
								Already have an account? <a
									href="/login"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>Login here</a
								>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
