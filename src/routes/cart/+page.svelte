<script lang="ts">
	import {
		Heading,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Button
	} from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { cart, type CartItem } from '$lib/stores/cart';

	let cartItems: CartItem[] = [];
	let total = 0;

	cart.subscribe((state) => {
		cartItems = state.items ?? [];
		total = state.total ?? 0;
	});

	function removeFromCart(id: string) {
		cart.removeItem(id);
	}

	function updateQuantity(id: string, quantity: number) {
		cart.updateQuantity(id, quantity);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<Heading tag="h1" class="mb-8">Shopping Cart</Heading>

	{#if cartItems.length === 0}
		<div class="py-12 text-center">
			<p class="mb-4 text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
			<Button href="/products">Continue Shopping</Button>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<Table class="w-full">
					<TableHead>
						<TableHeadCell>Product</TableHeadCell>
						<TableHeadCell>Quantity</TableHeadCell>
						<TableHeadCell>Price</TableHeadCell>
						<TableHeadCell>Total</TableHeadCell>
						<TableHeadCell></TableHeadCell>
					</TableHead>
					<TableBody>
						{#each cartItems as item}
							<TableBodyRow>
								<TableBodyCell>
									<div class="flex items-center">
										{#if item.image}
											<img
												src={item.image}
												alt={item.title}
												class="mr-4 h-16 w-16 rounded object-cover"
											/>
										{/if}
										<div>
											<h3 class="font-medium">{item.title}</h3>
											<p class="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
										</div>
									</div>
								</TableBodyCell>
								<TableBodyCell>
									<input
										type="number"
										value={item.quantity}
										min="1"
										class="w-20 rounded border px-2 py-1"
										on:input={(e) =>
											updateQuantity(
												item.id,
												parseInt((e.target as HTMLInputElement).value || '1')
											)}
									/>
								</TableBodyCell>
								<TableBodyCell>Ksh. {item.price.toFixed(2)}</TableBodyCell>
								<TableBodyCell>Ksh. {(item.price * item.quantity).toFixed(2)}</TableBodyCell>
								<TableBodyCell>
									<button
										class="text-red-500 hover:text-red-700"
										on:click={() => removeFromCart(item.id)}
									>
										<TrashBinSolid class="h-5 w-5" />
									</button>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>

			<div class="lg:col-span-1">
				<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
					<h2 class="mb-4 text-xl font-semibold">Order Summary</h2>
					<div class="space-y-4">
						<div class="flex justify-between">
							<span>Subtotal</span>
							<span>Ksh. {total.toFixed(2)}</span>
						</div>

						<hr class="border-gray-200 dark:border-gray-700" />
						<div class="flex justify-between font-semibold">
							<span>Total</span>
							<span>Ksh.{total.toFixed(2)}</span>
						</div>
						<Button href="/checkout" color="primary" class="w-full">Proceed to Checkout</Button>
						<Button href="/products" color="light" class="w-full">Continue Shopping</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
