<script lang="ts">
	import { Facebook, Instagram, GitHub, Twitter } from 'flowbite-svelte-blocks';
	import {
		Footer,
		FooterBrand,
		FooterLinkGroup,
		FooterLink,
		FooterCopyright,
		FooterIcon
	} from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';
</script>

<Footer footerType="socialmedia">
	<div class="grid gap-12 lg:grid-cols-6 lg:gap-24">
		<div class="col-span-2">
			<FooterBrand
				href="/"
				src={favicon}
				alt="Flowbite Logo"
				name="CBE Resources"
				aClass="flex mb-6"
			/>
			<p class="text-gray-600 dark:text-gray-400">
				Access more than a thousand resources including notes, schemes of work, exams, and more.
			</p>
		</div>
		<div class="col-span-2">
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Resources</h2>
			<FooterLinkGroup>
				<FooterLink liClass="mb-4" href="/">Notes</FooterLink>
				<FooterLink liClass="mb-4" href="/">Schemes of Work</FooterLink>
				<FooterLink liClass="mb-4" href="/">Exams</FooterLink>
				<FooterLink liClass="mb-4" href="">Revision Papers</FooterLink>
				<FooterLink liClass="mb-4" href="/">Curriculum Designs</FooterLink>
				<FooterLink liClass="mb-4" href="/">Report Cards</FooterLink>
				<FooterLink liClass="mb-4" href="/">Lesson Plans</FooterLink>
			</FooterLinkGroup>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
				HELP & SUPPORT
			</h2>
			<FooterLinkGroup>
				<FooterLink liClass="mb-4" href="/contact">Contact Us</FooterLink>
				<FooterLink liClass="mb-4" href="/">Help Center</FooterLink>
				<FooterLink liClass="mb-4" href="/">FAQ</FooterLink>
				<FooterLink liClass="mb-4" href="/">Sitemap</FooterLink>
			</FooterLinkGroup>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Legal</h2>
			<FooterLinkGroup>
				<FooterLink liClass="mb-4" href="/">Return and Refund Policy</FooterLink>

				<FooterLink liClass="mb-4" href="/">Privacy Policy</FooterLink>
				<FooterLink liClass="mb-4" href="/">Terms of Service</FooterLink>
			</FooterLinkGroup>
		</div>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="Flowbite™" />
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><Facebook /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><Instagram /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><Twitter /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><GitHub /></FooterIcon>
		</div>
	</div>
</Footer>
