<script lang="ts">
	import { Section, HeroHeader } from 'flowbite-svelte-blocks';
	import { Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import HeroSearch from './hero-search.svelte';
</script>

<Section name="heroVisual" class="overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 lg:col-span-12 lg:px-8">
		<div
			class="grid min-h-[600px] grid-cols-1 items-center gap-8 py-8 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20"
		>
			<!-- Left side content -->
			<div class="flex flex-col justify-center space-y-8">
				<div>
					<HeroHeader
						h1Class="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white"
						pClass="mb-6 text-lg font-normal text-gray-600 md:text-xl lg:text-xl dark:text-gray-400"
					>
						{#snippet h1()}
							CBE Resources
						{/snippet}
						{#snippet paragraph()}
							Your comprehensive hub for CBC curriculum resources in Kenya. Access quality lesson
							plans, detailed notes, schemes of work, revision papers, exams, curriculum designs,
							and report cards — all designed to enhance teaching and learning outcomes.
						{/snippet}
					</HeroHeader>
				</div>

				<!-- Feature highlights -->
				<div>
					<p
						class="mb-4 text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400"
					>
						Available Resources:
					</p>
					<div class="flex flex-wrap gap-3">
						<span
							class="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
						>
							Lesson Plans
						</span>
						<span
							class="inline-block rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300"
						>
							Notes
						</span>
						<span
							class="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
						>
							Exams & Revision Papers
						</span>
						<span
							class="inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300"
						>
							Report Cards
						</span>
						<span
							class="inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
						>
							Curriculum Designs
						</span>
						<span
							class="inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300"
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
							class="inline-flex w-full items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-500 font-semibold text-white hover:from-primary-600 hover:to-secondary-600 sm:w-auto"
						>
							Browse Resources
							<ArrowRightOutline size="md" class="-mr-1 ml-2" />
						</Button>
					</a>
					<a href="/login" class="inline-block">
						<Button
							color="alternative"
							size="lg"
							class="inline-flex w-full items-center justify-center border-2 border-gray-300 bg-white font-semibold text-gray-900 hover:bg-gray-50 sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
						>
							My Account
						</Button>
					</a>
				</div>
			</div>

			<!-- Right side: Prominent Search -->
			<div class="flex items-center justify-center">
				<div class="w-full max-w-lg">
					<!-- Search Section Header -->
					<div class="mb-8 text-center">
						<h3 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
							Find Resources Instantly
						</h3>
						<p class="text-base text-gray-600 dark:text-gray-400">
							Search from hundreds of CBC curriculum materials
						</p>
					</div>

					<!-- Search Component -->
					<div
						class="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-800"
					>
						<HeroSearch />

						<!-- Quick Search Tags -->
						<div class="mt-6">
							<p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Popular searches:</p>
							<div class="flex flex-wrap gap-2">
								<button
									class="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-all hover:scale-105 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
								>
									Grade 4 Math
								</button>
								<button
									class="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-all hover:scale-105 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
								>
									Science Schemes
								</button>
								<button
									class="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-all hover:scale-105 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
								>
									English Notes
								</button>
							</div>
						</div>
					</div>

					<!-- Stats or Trust Indicators -->
					<div class="mt-8 grid grid-cols-3 gap-6 text-center">
						<div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
							<div class="text-2xl font-bold text-primary-600 dark:text-primary-400">100+</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">Lesson Plans</div>
						</div>
						<div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
							<div class="text-2xl font-bold text-secondary-600 dark:text-secondary-400">200+</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">Exam Papers</div>
						</div>
						<div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
							<div class="text-2xl font-bold text-green-600 dark:text-green-400">500+</div>
							<div class="text-sm text-gray-600 dark:text-gray-400">Resources</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Section>
