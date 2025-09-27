<script lang="ts">
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let status = 'pending';

	onMount(async () => {
		const $page = await new Promise<any>((r) => {
			const unsub = page.subscribe((p) => {
				unsub();
				r(p);
			});
		});

		const uid = $page?.params?.uid;
		const token = $page?.params?.token;
		try {
			const res = await apiService.verifyEmail(uid, token);
			if (res.status === 200) {
				toastStore.success(res.message || 'Email verified');
				status = 'success';
				// backend often provides redirect_url
				const redirect = res.data?.redirect_url ?? '/login';
				goto(redirect);
			} else {
				toastStore.error(res.message || 'Verification failed');
				status = 'failed';
				const redirect = res.data?.redirect_url ?? '/resend-verification';
				goto(redirect);
			}
		} catch (e) {
			toastStore.error('Network error during verification');
			status = 'failed';
			goto('/resend-verification');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="max-w-lg rounded-lg bg-white p-8 shadow dark:bg-gray-800">
		{#if status === 'pending'}
			<p class="dark:text-white">Verifying your email...</p>
		{:else if status === 'success'}
			<p class="dark:text-white">Email verified! Redirecting...</p>
		{:else}
			<p class="dark:text-white">Verification failed. Redirecting...</p>
		{/if}
	</div>
</div>
