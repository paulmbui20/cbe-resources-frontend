<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/navbar.svelte';
	import Footer from '../components/footer.svelte';

	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { navProgress } from '$lib/stores/navProgress';

	let { children } = $props();

	// wire navigation events to the progress store
	beforeNavigate(() => {
		navProgress.start();
	});

	afterNavigate(() => {
		navProgress.done();
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

<main class="mx-1 md:mx-5">
	{@render children?.()}
</main>

<Footer />
