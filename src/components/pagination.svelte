<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let page = 1;
	export let pageSize = 10;
	export let total = 0;

	const dispatch = createEventDispatcher();

	$: pageCount = Math.max(1, Math.ceil(total / pageSize));

	function goto(p: number) {
		if (p < 1) p = 1;
		if (p > pageCount) p = pageCount;
		page = p;
		console.debug('[pagination] goto ->', p);
		dispatch('pageChange', { page: p });
	}
</script>

<div class="mt-4 flex items-center justify-between">
	<div class="text-sm text-gray-600">Page {page} of {pageCount}</div>
	<div class="flex items-center gap-2">
		<button class="rounded border px-2 py-1" on:click={() => goto(page - 1)} disabled={page <= 1}
			>Prev</button
		>
		{#each Array(pageCount) as _, i}
			{#if Math.abs(i + 1 - page) <= 3 || i === 0 || i + 1 === pageCount}
				<button
					class="rounded border px-2 py-1"
					class:bg-primary-600={page === i + 1}
					class:text-white={page === i + 1}
					on:click={() => goto(i + 1)}>{i + 1}</button
				>
			{:else if i + 1 === page - 4 || i + 1 === page + 4}
				<span class="px-2">…</span>
			{/if}
		{/each}
		<button
			class="rounded border px-2 py-1"
			on:click={() => goto(page + 1)}
			disabled={page >= pageCount}>Next</button
		>
	</div>
</div>
