<script lang="ts">
	import { Facebook, Instagram } from 'flowbite-svelte-blocks';
	import {
		Footer,
		FooterBrand,
		FooterLinkGroup,
		FooterLink,
		FooterCopyright,
		FooterIcon
	} from 'flowbite-svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { EnvelopeOpenSolid, WhatsappSolid, XSolid, PhoneSolid } from 'flowbite-svelte-icons';
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
				<FooterLink class="mb-4" href="/notes">Notes</FooterLink>
				<FooterLink class="mb-4" href="/schemes-of-work">Schemes of Work</FooterLink>
				<FooterLink class="mb-4" href="/exams">Exams</FooterLink>
				<FooterLink class="mb-4" href="/revision-papers">Revision Papers</FooterLink>
				<FooterLink class="mb-4" href="/curriculum-designs">Curriculum Designs</FooterLink>
				<FooterLink class="mb-4" href="/report-cards">Report Cards</FooterLink>
				<FooterLink class="mb-4" href="/lesson-plans">Lesson Plans</FooterLink>
			</FooterLinkGroup>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
				HELP & SUPPORT
			</h2>
			<FooterLinkGroup>
				<FooterLink class="mb-4" href="/contact">Contact Us</FooterLink>
				<FooterLink class="mb-4" href="/faqs">FAQ</FooterLink>
				<FooterLink class="mb-4" href="/sitemap">Sitemap</FooterLink>
				<FooterLink class="mb-4" href="/about">About Us</FooterLink>
			</FooterLinkGroup>
		</div>
		<div>
			<h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Legal</h2>
			<FooterLinkGroup>
				<FooterLink class="mb-4" href="/legal/refund">Return and Refund Policy</FooterLink>
				<FooterLink class="mb-4" href="/legal/privacy">Privacy Policy</FooterLink>
				<FooterLink class="mb-4" href="/legal/terms">Terms of Service</FooterLink>
			</FooterLinkGroup>
		</div>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="AcerSchoolApps Solutions™" />
		<div class="mt-4 flex space-x-6 text-xl sm:mt-0 sm:justify-center">
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><Facebook /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><Instagram /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><XSolid /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><WhatsappSolid /></FooterIcon>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"
				><EnvelopeOpenSolid /></FooterIcon
			>
			<FooterIcon href="/" class="text-gray-400 hover:text-gray-900"><PhoneSolid /></FooterIcon>
		</div>
	</div>
</Footer>
