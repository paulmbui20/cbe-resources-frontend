<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		Button,
		Dropdown,
		DropdownItem,
		Badge
	} from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import { ChevronDownOutline, CartPlusSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import favicon from '$lib/assets/favicon.svg';
	import { cart, type CartItem } from '$lib/stores/cart';

	let cartOpen = false;
	let itemCount: number;
	let cartItems: CartItem[];
	let total: number;

	cart.subscribe((state) => {
		itemCount = state.itemCount;
		cartItems = state.items;
		total = state.total;
	});

	function removeFromCart(id: string) {
		cart.removeItem(id);
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.cart-dropdown')) {
			cartOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<header>
	<Navbar>
		<NavBrand href="/">
			<img src={favicon} class="mr-2 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white"
				>CBE Resources</span
			>
		</NavBrand>
		<div class="flex items-center gap-x-1 md:gap-x-2 lg:order-2">
			<div class="cart-dropdown relative">
				<button
					class="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
					on:click={() => (cartOpen = !cartOpen)}
				>
					<CartPlusSolid class="h-6 w-6 text-gray-700 dark:text-white" />
					{#if itemCount > 0}
						<Badge color="red" rounded class="absolute -top-2 -right-2">{itemCount}</Badge>
					{/if}
				</button>

				{#if cartOpen}
					<div
						class="absolute right-0 z-50 mt-2 w-80 rounded-lg bg-white shadow-xl dark:bg-gray-800"
					>
						<div class="p-4">
							<h3 class="mb-4 text-lg font-semibold">Shopping Cart</h3>
							{#if cartItems.length === 0}
								<p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
							{:else}
								<div class="max-h-60 space-y-4 overflow-y-auto">
									{#each cartItems as item}
										<div
											class="flex items-center justify-between border-b pb-2 dark:border-gray-700"
										>
											<div class="flex-1">
												<h4 class="text-sm font-medium">{item.title}</h4>
												<p class="text-sm text-gray-500">
													Quantity: {item.quantity} x Ksh.{item.price}
												</p>
											</div>
											<button
												class="text-red-500 hover:text-red-700"
												on:click={() => removeFromCart(item.id)}
											>
												<TrashBinSolid class="h-5 w-5" />
											</button>
										</div>
									{/each}
								</div>
								<div class="mt-4 border-t pt-4 dark:border-gray-700">
									<p class="mb-4 flex justify-between">
										<span class="font-semibold">Total:</span>
										<span>Ksh. {total.toFixed(2)}</span>
									</p>
									<div class="flex gap-2">
										<Button href="/cart" color="light" class="flex-1">View Cart</Button>
										<Button href="/checkout" color="primary" class="flex-1">Checkout</Button>
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
			<DarkMode class="border text-primary-500 dark:border-gray-800 dark:text-primary-600" />
			<Button href="/login">Log in</Button>
			<NavHamburger class="hover:cursor-pointer" />
		</div>
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/products">Products</NavLi>
			<NavLi class="cursor-pointer">
				Categories
				<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white" />
			</NavLi>
			<Dropdown>
				<DropdownItem href="/notes">Notes</DropdownItem>
				<DropdownItem href="/schemes-of-work">Schemes of Work</DropdownItem>
				<DropdownItem href="/exams">Exams</DropdownItem>
				<DropdownItem href="/revision-papers">Revision Papers</DropdownItem>
				<DropdownItem href="/curriculum-designs">Curriculum Designs</DropdownItem>
				<DropdownItem href="/report-cards">Report Cards</DropdownItem>
				<DropdownItem href="/lesson-plans">Lesson Plans</DropdownItem>
			</Dropdown>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>

<style>
	/* Add overlay when cart is open */
	:global(body:has(.cart-dropdown:has(button[aria-expanded='true']))) {
		overflow: hidden;
	}
	:global(body:has(.cart-dropdown:has(button[aria-expanded='true'])))::before {
		content: '';
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 40;
	}
</style>
