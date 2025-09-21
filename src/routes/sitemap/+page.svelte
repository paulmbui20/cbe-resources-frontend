<script lang="ts">
	import { Heading } from 'flowbite-svelte';
</script>

<div class="container mx-auto px-4 py-8">
	<Heading tag="h1" class="mb-8">Sitemap</Heading>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-xl font-bold">Resources</h2>
			<ul class="space-y-2 text-gray-600 dark:text-gray-400">
				<li><a href="/notes" class="hover:underline">Notes</a></li>
				<li><a href="/schemes-of-work" class="hover:underline">Schemes of Work</a></li>
				<li><a href="/exams" class="hover:underline">Exams</a></li>
				<li><a href="/revision-papers" class="hover:underline">Revision Papers</a></li>
				<li><a href="/curriculum-designs" class="hover:underline">Curriculum Designs</a></li>
				<li><a href="/report-cards" class="hover:underline">Report Cards</a></li>
				<li><a href="/lesson-plans" class="hover:underline">Lesson Plans</a></li>
			</ul>
		</div>

		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-xl font-bold">Help & Support</h2>
			<ul class="space-y-2 text-gray-600 dark:text-gray-400">
				<li><a href="/about" class="hover:underline">About Us</a></li>
				<li><a href="/contact" class="hover:underline">Contact Us</a></li>
				<li><a href="/faqs" class="hover:underline">FAQs</a></li>
			</ul>
		</div>

		<div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
			<h2 class="mb-4 text-xl font-bold">Account</h2>
			<ul class="space-y-2 text-gray-600 dark:text-gray-400">
				<li><a href="/login" class="hover:underline">Login</a></li>
				<li><a href="/sign-up" class="hover:underline">Sign Up</a></li>
			</ul>
		</div>
	</div>
</div>
