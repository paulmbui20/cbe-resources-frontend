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

<div class="px-4 sm:px-6 lg:px-8">
	<Heading tag="h1" class="mb-6 sm:mb-8">Shopping Cart</Heading>

	{#if cartItems.length === 0}
		<div class="py-12 text-center">
			<p class="mb-4 text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
			<Button href="/products">Continue Shopping</Button>
		</div>
	{:else}
		<div class="grid gap-6 lg:grid-cols-3 lg:gap-8">
			<div class="lg:col-span-2">
				<!-- Mobile Card Layout (visible on small screens) -->
				<div class="block space-y-4 md:hidden">
					{#each cartItems as item}
						<div class="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
							<div class="flex items-start space-x-4">
								{#if item.image}
									<img
										src={item.image}
										alt={item.title}
										class="h-16 w-16 flex-shrink-0 rounded object-cover"
									/>
								{/if}
								<div class="min-w-0 flex-1">
									<h3 class="truncate font-medium text-gray-900 dark:text-white">{item.title}</h3>
									<p class="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
									<p class="mt-1 text-sm font-medium text-gray-900 dark:text-white">
										Ksh. {item.price.toFixed(2)}
									</p>
								</div>
								<button
									class="flex-shrink-0 text-red-500 hover:text-red-700"
									on:click={() => removeFromCart(item.id)}
								>
									<TrashBinSolid class="h-5 w-5" />
								</button>
							</div>
							<div class="mt-4 flex items-center justify-between">
								<div class="flex items-center space-x-2">
									<label class="text-sm font-medium text-gray-700 dark:text-gray-300"> Qty: </label>
									<input
										type="number"
										value={item.quantity}
										min="1"
										class="w-16 rounded border px-2 py-1 text-center"
										on:input={(e) =>
											updateQuantity(
												item.id,
												parseInt((e.target as HTMLInputElement).value || '1')
											)}
									/>
								</div>
								<div class="text-right">
									<p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
									<p class="font-medium text-gray-900 dark:text-white">
										Ksh. {(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Desktop Table Layout (hidden on small screens) -->
				<div class="hidden md:block">
					<div class="overflow-x-auto">
						<Table class="min-w-full">
							<TableHead>
								<TableHeadCell class="whitespace-nowrap">Product</TableHeadCell>
								<TableHeadCell class="whitespace-nowrap">Quantity</TableHeadCell>
								<TableHeadCell class="whitespace-nowrap">Price</TableHeadCell>
								<TableHeadCell class="whitespace-nowrap">Total</TableHeadCell>
								<TableHeadCell class="w-12"></TableHeadCell>
							</TableHead>
							<TableBody>
								{#each cartItems as item}
									<TableBodyRow>
										<TableBodyCell class="min-w-0">
											<div class="flex items-center space-x-4">
												{#if item.image}
													<img
														src={item.image}
														alt={item.title}
														class="h-16 w-16 flex-shrink-0 rounded object-cover"
													/>
												{/if}
												<div class="min-w-0 flex-1">
													<h3 class="truncate font-medium">{item.title}</h3>
													<p class="truncate text-sm text-gray-500 dark:text-gray-400">
														{item.type}
													</p>
												</div>
											</div>
										</TableBodyCell>
										<TableBodyCell>
											<input
												type="number"
												value={item.quantity}
												min="1"
												class="w-20 rounded border px-2 py-1 text-center"
												on:input={(e) =>
													updateQuantity(
														item.id,
														parseInt((e.target as HTMLInputElement).value || '1')
													)}
											/>
										</TableBodyCell>
										<TableBodyCell class="whitespace-nowrap">
											Ksh. {item.price.toFixed(2)}
										</TableBodyCell>
										<TableBodyCell class="whitespace-nowrap">
											Ksh. {(item.price * item.quantity).toFixed(2)}
										</TableBodyCell>
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
				</div>
			</div>

			<div class="lg:col-span-1">
				<div
					class="sticky top-6 rounded-lg bg-white p-6 text-gray-900 shadow dark:bg-gray-800 dark:text-white"
				>
					<h2 class="mb-4 text-xl font-semibold">Order Summary</h2>
					<div class="space-y-4">
						<div class="flex justify-between">
							<span>Subtotal</span>
							<span>Ksh. {total.toFixed(2)}</span>
						</div>

						<hr class="border-gray-200 dark:border-gray-700" />
						<div class="flex justify-between font-semibold">
							<span>Total</span>
							<span>Ksh. {total.toFixed(2)}</span>
						</div>
						<Button href="/checkout" color="primary" class="w-full">Proceed to Checkout</Button>
						<Button href="/products" color="light" class="w-full">Continue Shopping</Button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
