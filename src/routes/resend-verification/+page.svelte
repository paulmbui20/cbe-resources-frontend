<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import { apiService } from '$lib/api';
	import { onMount } from 'svelte';

	let sending = false;
	async function send() {
		sending = true;
		try {
			const res = await apiService.resendVerification();
			if (res.status === 200) {
				toastStore.success(res.message || 'Verification email resent');
			} else {
				toastStore.error(res.message || 'Failed to resend verification');
			}
		} catch (e) {
			toastStore.error('Network error. Please try again.');
		} finally {
			sending = false;
		}
	}

	onMount(() => {
		// auto attempt send once mounted
		send();
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="max-w-xl rounded-lg bg-white p-8 shadow dark:bg-gray-800">
		<h1 class="text-xl font-semibold dark:text-white">Resend Verification</h1>
		<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
			We will resend a verification email if your account is unverified.
		</p>
		<div class="mt-6">
			<button class="btn" on:click={send} disabled={sending}
				>{sending ? 'Sending...' : 'Resend'}</button
			>
		</div>
	</div>
</div>
