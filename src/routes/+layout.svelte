<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/navbar.svelte';
	import Footer from '../components/footer.svelte';

	let { children } = $props();
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

<main class="mx-2 md:mx-5">
	{@render children?.()}
</main>

<Footer />
