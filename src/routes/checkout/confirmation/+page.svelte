<script lang="ts">
	import { Heading, Button } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="container mx-auto px-4 py-16">
	<div class="mx-auto max-w-2xl text-center">
		<CheckCircleSolid class="mx-auto mb-6 h-20 w-20 text-green-500" />
		<Heading tag="h1" class="mb-4">Order Confirmed!</Heading>
		<p class="mb-8 text-gray-600 dark:text-gray-400">
			Thank you for your purchase. We've sent a confirmation email with your order details.
		</p>
		<div class="flex justify-center gap-4">
			<Button href="/products" color="light">Continue Shopping</Button>
			<Button href="/">Return Home</Button>
		</div>
	</div>
</div>
