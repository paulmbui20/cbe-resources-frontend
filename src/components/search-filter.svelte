<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { productsStore, type Product } from '$lib/stores/dummy-products';
	import { derived, writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	export let placeholder = 'Search products...';

	let term = '';
	let suggestions: Product[] = [];
	let selectedFilters: string[] = [];

	const allProducts = productsStore;

	// Simple debounce for input
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;

	function onInput(e: Event) {
		term = (e.target as HTMLInputElement).value;
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			updateSuggestions();
			dispatch('search', { term, filters: selectedFilters });
		}, 200);
	}

	function updateSuggestions() {
		const q = term.trim().toLowerCase();
		let items: Product[] = [];
		productsStore.subscribe((list) => {
			items = list;
		})();
		if (!q || q.length < 2) {
			// only show suggestions after user typed at least 2 chars
			suggestions = [];
			return;
		}
		suggestions = items
			.filter(
				(p) => p.title.toLowerCase().includes(q) || (p.subject || '').toLowerCase().includes(q)
			)
			.slice(0, 6);
	}

	function pickSuggestion(p: Product) {
		term = p.title;
		suggestions = [];
		dispatch('select', { product: p });
		dispatch('search', { term, filters: selectedFilters });
	}

	function toggleFilter(f: string) {
		if (selectedFilters.includes(f)) selectedFilters = selectedFilters.filter((x) => x !== f);
		else selectedFilters = [...selectedFilters, f];
		dispatch('filter', { filters: selectedFilters });
		dispatch('search', { term, filters: selectedFilters });
	}

	onMount(() => updateSuggestions());
</script>

<div class="relative">
	<div class="flex items-center gap-2">
		<input
			type="search"
			class="w-full rounded-lg border px-3 py-2 shadow-sm"
			{placeholder}
			bind:value={term}
			on:input={onInput}
			aria-label="Search"
		/>
		<button
			class="rounded bg-primary-600 px-3 py-2 text-white"
			on:click={() => dispatch('search', { term, filters: selectedFilters })}>Search</button
		>
	</div>

	{#if suggestions.length}
		<div class="absolute right-0 left-0 z-40 mt-1 rounded border bg-white shadow dark:bg-gray-800">
			{#each suggestions as s}
				<button
					class="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
					on:click={() => pickSuggestion(s)}
				>
					<div class="text-sm font-medium text-gray-600 dark:text-gray-400">{s.title}</div>
					<div class="text-xs text-gray-500 dark:text-gray-400">
						{s.type}
						{#if s.subject}• {s.subject}{/if} • {s.level}
					</div>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Simple filters: types available from productsStore -->
	<div class="mt-2 flex flex-wrap gap-2">
		{#each Array.from(new Set($productsStore.map((p) => p.type))) as f}
			<button
				class="rounded border px-2 py-1 text-sm text-gray-600 dark:text-gray-400"
				class:selected={selectedFilters.includes(f)}
				on:click={() => toggleFilter(f)}>{f}</button
			>
		{/each}
	</div>
</div>

<style>
	.selected {
		background-color: #2563eb;
		color: white;
	}
</style>
