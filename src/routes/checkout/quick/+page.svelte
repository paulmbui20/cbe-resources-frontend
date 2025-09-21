<script lang="ts">
	import { Heading, Label, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart';
	import { quickCheckout } from '$lib/stores/quickCheckout';
	import { productsStore } from '$lib/stores/dummy-products';

	let phone = '';
	let email = '';
	let productId = '';
	let productTitle = '';
	let productPrice = 0;

	// read product from quickCheckout store (safer than query params)
	let qc: any = {};
	quickCheckout.subscribe((v) => (qc = v));
	onMount(() => {
		if (qc.product) {
			productId = qc.product.id;
			productTitle = qc.product.title;
			productPrice = qc.product.price;
		}
	});

	function submit() {
		// Minimal validation
		if (!phone || phone.length < 6) {
			alert('Please enter a valid phone number');
			return;
		}
		if (!email || !email.includes('@')) {
			alert('Please enter a valid email');
			return;
		}

		// For quick checkout, add a single item to cart and go to confirmation or trigger backend
		cart.clearCart();
		cart.addItem({
			id: productId || crypto.randomUUID(),
			title: productTitle || 'Quick Item',
			price: productPrice || 0,
			type: 'product' as any
		});
		quickCheckout.clear();

		// Here we'd call backend to initiate mpesa; for now just navigate to confirmation
		goto('/checkout/confirmation');
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-xl rounded bg-white p-6 shadow">
		<Heading tag="h2" class="mb-4">Quick Checkout</Heading>
		<div class="mb-4">
			<div class="font-medium">{productTitle}</div>
			<div class="text-sm text-gray-600">Ksh. {productPrice}</div>
		</div>

		<form class="space-y-4" on:submit|preventDefault={submit}>
			<div>
				<Label for="phone">Phone number</Label>
				<Input id="phone" type="tel" required bind:value={phone} placeholder="07xxxxxxxx" />
			</div>
			<div>
				<Label for="email">Email address</Label>
				<Input id="email" type="email" required bind:value={email} />
			</div>

			<div class="flex items-center justify-between">
				<button
					type="button"
					class="rounded border bg-gray-100 px-4 py-2"
					on:click={() => goto('/products')}>Cancel</button
				>
				<button type="submit" class="rounded bg-primary-600 px-4 py-2 text-white"
					>Pay Ksh. {productPrice}</button
				>
			</div>
		</form>
	</div>
</div>
