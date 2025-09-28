<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/navbar.svelte';
	import Footer from '../components/footer.svelte';

	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { navProgress } from '$lib/stores/navProgress';
	import ToastContainer from '../components/ToastContainer.svelte';
	import { onMount } from 'svelte';
	import { setCsrf } from '$lib/stores/csrf';

	let { children } = $props();

	// wire navigation events to the progress store
	beforeNavigate(() => {
		navProgress.start();
	});

	afterNavigate(() => {
		navProgress.done();
	});

	// Fetch CSRF token on app start and store it for later use
	onMount(async () => {
		try {
			// call backend endpoint which sets CSRF cookie via @ensure_csrf_cookie
			const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/accounts/api/csrf/`, {
				method: 'GET',
				credentials: 'include'
			});
			if (resp.ok) {
				// backend sets the cookie; also try to read the csrftoken cookie if available
				let token: string | null = null;
				try {
					// Parse document.cookie if running in browser
					if (typeof document !== 'undefined') {
						const match = document.cookie.match(/(^|; )csrftoken=([^;]+)/);
						if (match) token = decodeURIComponent(match[2]);
					}
				} catch (e) {
					// ignore cookie parsing errors
				}
				// Persist token in sessionStorage and store
				if (token) {
					sessionStorage.setItem('csrf_token', token);
					setCsrf(token);
				}
			}
		} catch (e) {
			console.debug('Failed to fetch CSRF token on mount', e);
		}
	});
</script>

<svelte:head>
	<title>CBC Resources Hub - Quality Educational Materials for Teachers in Kenya</title>
	<meta
		name="description"
		content="Access high-quality CBC-aligned educational resources, lesson plans, schemes of work, and teaching materials. Supporting Kenyan teachers in delivering effective competency-based curriculum."
	/>
	<meta property="og:title" content="CBC Resources Hub - Quality Educational Materials for Kenya" />
	<meta
		property="og:description"
		content="Download CBC-aligned educational resources and teaching materials. Supporting teachers in competency-based curriculum delivery across Kenya."
	/>
	<meta property="og:type" content="website" />
	<meta
		name="keywords"
		content="CBC, Kenya, teaching resources, lesson plans, competency-based curriculum, educational materials"
	/>
</svelte:head>

<Navbar />

<!-- Top loading progress bar (Chrome-like) -->
{#if $navProgress > 0}
	<div aria-hidden="true" class="fixed top-0 right-0 left-0 z-50 h-0.5 bg-transparent">
		<div
			class="transition-width h-0.5 bg-primary-600 duration-200"
			style="width: {$navProgress}%"
		></div>
	</div>
{/if}

<!-- Toast notifications -->
<ToastContainer />

<main class="mx-1 md:mx-5">
	{@render children?.()}
</main>

<Footer />
