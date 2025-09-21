<script lang="ts">
	import { Card, Button, Rating, Badge } from 'flowbite-svelte';
</script>

<Card class="p-0">
	<div class="px-5 pb-5">
		<a href="/">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				Grade 7 Rationalized English Grammar Notes for Term 1, 2, and 3
			</h5>
		</a>
		<Rating rating={4} size={24} class="mt-2.5 mb-5">
			{#snippet text()}
				<Badge class="ms-3">4</Badge>
			{/snippet}
		</Rating>
		<div class="">
			<span class="text-3xl font-bold text-gray-900 dark:text-white"> Ksh 80</span>
			<div class="flex items-center gap-1">
				<Button href="/">Buy now</Button>
				<Button color="green" href="/">Add to Cart</Button>
			</div>
		</div>
	</div>
</Card>
