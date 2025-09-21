<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Button } from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { DarkMode } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
</script>

<header>
	<Navbar>
		<NavBrand href="/">
			<img src={favicon} class="mr-2 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white"
				>CBE Resources</span
			>
		</NavBrand>
		<div class="flex items-center gap-x-1 md:gap-x-2 lg:order-2">
			<DarkMode class="border text-primary-500 dark:border-gray-800 dark:text-primary-600" />
			<Button href="/login">Log in</Button>
			<NavHamburger class="hover:cursor-pointer" />
		</div>
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/products">Products</NavLi>
			<NavLi class="cursor-pointer">
				Categories<ChevronDownOutline
					class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white"
				/>
			</NavLi>
			<Dropdown simple>
				<DropdownItem>Notes</DropdownItem>
				<DropdownItem>Schemes of Work</DropdownItem>
				<DropdownItem>Exams</DropdownItem>
				<DropdownItem>Revision Papers</DropdownItem>
				<DropdownItem>Curriculum Designs</DropdownItem>
				<DropdownItem>Report Cards</DropdownItem>
				<DropdownItem>Lesson Plans</DropdownItem>
				<DropdownItem>Other</DropdownItem>
			</Dropdown>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
