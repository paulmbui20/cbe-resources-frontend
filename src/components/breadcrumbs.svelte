<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { FolderArrowRightOutline, HomeOutline } from 'flowbite-svelte-icons';
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
		<li>
			<span class="flex items-center gap-2">
				<HomeOutline class="text-gray-800 dark:text-white" />
				<a
					href="/"
					class="text-gray-900 hover:text-primary-600 hover:underline
                 dark:text-white dark:hover:text-white">Home</a
				>
			</span>
		</li>
		{#each $crumbs as c, i}
			<li>
				<FolderArrowRightOutline />
			</li>
			<li>
				<a
					href={c.href}
					class="text-gray900 hover:text-primary-600 hover:underline
                dark:text-white">{c.label}</a
				>
			</li>
		{/each}
	</ol>
</nav>
