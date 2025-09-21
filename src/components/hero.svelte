<script lang="ts">
	import { Section, HeroHeader } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import HeroSearch from './hero-search.svelte';
</script>

<Section name="heroVisual">
	<div
		class="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 md:gap-8 md:py-8 lg:gap-8 lg:py-10 xl:py-12"
	>
		<!-- Left side content -->
		<div class="flex flex-col justify-center space-y-6">
			<HeroHeader
				h1Class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white"
				pClass="mb-4 text-lg font-normal text-gray-600 md:text-xl lg:text-xl dark:text-gray-400"
			>
				{#snippet h1()}
					CBE Resources
				{/snippet}
				{#snippet paragraph()}
					Your comprehensive hub for CBC curriculum resources in Kenya. Access quality lesson plans,
					detailed notes, schemes of work, revision papers, exams, curriculum designs, and report
					cards — all designed to enhance teaching and learning outcomes.
				{/snippet}
			</HeroHeader>

			<!-- Feature highlights -->
			<div class="mb-6">
				<p
					class="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
				>
					Available Resources:
				</p>
				<div class="flex flex-wrap gap-2">
					<span
						class="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
					>
						Lesson Plans
					</span>
					<span
						class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
					>
						Notes
					</span>
					<span
						class="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
					>
						Exams & Revision Papers
					</span>
					<span
						class="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300"
					>
						Report Cards
					</span>
					<span
						class="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
					>
						Curriculum Designs
					</span>
					<span
						class="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300"
					>
						Schemes of Work
					</span>
				</div>
			</div>

			<!-- Call to Actions -->
			<div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
				<a href="/products" class="inline-block">
					<Button
						size="lg"
						class="inline-flex w-full items-center justify-center font-semibold hover:cursor-pointer sm:w-auto"
					>
						Browse Resources
						<ArrowRightOutline size="md" class="-mr-1 ml-2" />
					</Button>
				</a>
				<a href="/login" class="inline-block">
					<Button
						color="green"
						size="lg"
						class="inline-flex w-full items-center justify-center font-semibold hover:cursor-pointer sm:w-auto"
					>
						My Account
					</Button>
				</a>
			</div>
		</div>

		<!-- Right side: Prominent Search -->
		<div class="flex items-center justify-center md:justify-end">
			<div class="w-full max-w-lg">
				<!-- Search Section Header -->
				<div class="mb-6 text-center">
					<h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
						Find Resources Instantly
					</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Search from hundrends of CBC curriculum materials
					</p>
				</div>

				<!-- Search Component -->
				<div
					class="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800"
				>
					<HeroSearch />

					<!-- Quick Search Tags -->
					<div class="mt-4">
						<p class="mb-2 text-xs text-gray-500 dark:text-gray-400">Popular searches:</p>
						<div class="flex flex-wrap gap-2">
							<button
								class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							>
								Grade 4 Math
							</button>
							<button
								class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							>
								Science Schemes
							</button>
							<button
								class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							>
								English Notes
							</button>
						</div>
					</div>
				</div>

				<!-- Stats or Trust Indicators -->
				<div class="mt-6 grid grid-cols-3 gap-4 text-center">
					<div>
						<div class="text-2xl font-bold text-red-600">100+</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">Lesson Plans</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-blue-600">200+</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">Exam Papers</div>
					</div>
					<div>
						<div class="text-2xl font-bold text-green-600">500+</div>
						<div class="text-xs text-gray-600 dark:text-gray-400">Resources</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Section>
