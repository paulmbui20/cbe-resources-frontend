<script lang="ts">
	import { Search, Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	// You can add your search logic here later
	let searchTerm = '';

	const handleSearch = () => {
		// Your search implementation will go here
		console.log('Searching for:', searchTerm);
	};
</script>

<div class="relative">
	<Search
		bind:value={searchTerm}
		size="lg"
		class="w-full rounded-xl border-2 border-gray-200 shadow-sm focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 dark:border-gray-600 dark:focus-within:border-red-500 dark:focus-within:ring-red-800/20"
		placeholder="Search lesson plans, notes, exams, schemes of work..."
		on:input={() => {
			// You can add real-time search suggestions here
		}}
	>
		<Button
			size="lg"
			class="ml-2 px-6 font-semibold shadow-sm transition-shadow hover:shadow-md"
			on:click={handleSearch}
		>
			<SearchOutline size="sm" class="mr-2" />
			Search
		</Button>
	</Search>

	<!-- Optional: Search suggestions dropdown (you can implement this later) -->
	<!-- 
	{#if searchTerm.length > 0}
		<div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
			<div class="p-3">
				<div class="text-sm text-gray-600 dark:text-gray-400">
					Search suggestions will appear here...
				</div>
			</div>
		</div>
	{/if}
	-->
</div>
