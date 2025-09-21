<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	const crumbs = derived(page, ($page) => {
		const parts = $page.url.pathname.split('/').filter(Boolean);
		const accum: { href: string; label: string }[] = [];
		let path = '';
		parts.forEach((p) => {
			path += `/${p}`;
			accum.push({ href: path, label: decodeURIComponent(p).replace(/[-_]/g, ' ') });
		});
		return accum;
	});
</script>

<nav class="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
	<ol class="flex items-center gap-2">
		<li><a href="/" class="hover:underline">Home</a></li>
		{#each $crumbs as c, i}
			<li>•</li>
			<li><a href={c.href} class="hover:underline">{c.label}</a></li>
		{/each}
	</ol>
</nav>
