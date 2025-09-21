<script lang="ts">
	import { Heading, Label, Input, Button, ButtonGroup, Textarea } from 'flowbite-svelte';
	import { cart } from '$lib/stores/cart';
	import { goto } from '$app/navigation';

	let email = '';
	let phone = '';
	let total = 0;

	cart.subscribe((state) => {
		total = state.total ?? 0;
	});

	function submit() {
		if (!phone || phone.length < 6) {
			alert('Please enter a valid phone number');
			return;
		}
		if (!email || !email.includes('@')) {
			alert('Please enter a valid email');
			return;
		}

		// trigger backend MPESA process later; for now clear cart and go to confirmation
		cart.clearCart();
		goto('/checkout/confirmation');
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-3xl">
		<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
			<Heading tag="h2" class="mb-6">Checkout</Heading>
			<form class="space-y-4" on:submit|preventDefault={submit}>
				<div>
					<Label for="phone">Phone number</Label>
					<Input id="phone" type="tel" required bind:value={phone} placeholder="07xxxxxxxx" />
				</div>
				<div>
					<Label for="email">Email address</Label>
					<Input id="email" type="email" required bind:value={email} />
				</div>

				<div class="mt-6 border-t pt-4">
					<div class="flex justify-between text-lg font-bold">
						<span>Total</span>
						<span>Ksh. {total.toFixed(2)}</span>
					</div>
				</div>

				<div class="flex justify-between">
					<Button color="light" on:click={() => goto('/products')}>Back</Button>
					<Button type="submit" color="primary">Complete Order</Button>
				</div>
			</form>
		</div>
	</div>
</div>
