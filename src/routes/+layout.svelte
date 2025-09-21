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
	<link rel="icon" href={favicon} />
	<title>CBE Resources</title>
	<meta
		name="description"
		content="Your comprehensive hub for CBC curriculum resources in Kenya, get the latest lesson plans, detailed notes, schemes of work, revision papers, exams, curriculum designs, and report cards — all designed to enhance teaching and learning outcomes."
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

<main class="mx-2 md:mx-5">
	{@render children?.()}
</main>

<Footer />
