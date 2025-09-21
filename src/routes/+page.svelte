<script lang="ts">
	import Hero from '../components/hero.svelte';
	import { productsStore, type Product } from '$lib/stores/dummy-products';
	import ResourceCard from '../components/ecommerce/resource-card.svelte';
	import { Button, Card } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, CheckCircleOutline, StarOutline } from 'flowbite-svelte-icons';

	let featuredProducts: Product[] = [];

	productsStore.subscribe((items) => {
		featuredProducts = items.slice(0, 8);
	});

	const features = [
		{
			title: 'CBC Aligned Content',
			description:
				"All resources are carefully designed to align with Kenya's Competency-Based Curriculum standards and learning outcomes",
			icon: '📚',
			color: 'red'
		},
		{
			title: 'Instant Digital Access',
			description:
				'Download and use resources immediately after purchase. No shipping delays or physical constraints',
			icon: '⚡',
			color: 'blue'
		},
		{
			title: 'Expert Teacher Support',
			description:
				'Created by experienced educators and curriculum specialists with deep CBC knowledge',
			icon: '👩‍🏫',
			color: 'green'
		},
		{
			title: 'Regular Content Updates',
			description:
				'Stay current with curriculum changes, new assessment methods, and evolving educational best practices',
			icon: '🔄',
			color: 'purple'
		},
		{
			title: 'Time-Saving Resources',
			description:
				'Pre-designed lesson plans, schemes of work, and assessments that reduce your preparation time significantly',
			icon: '⏰',
			color: 'yellow'
		},
		{
			title: 'Affordable Pricing',
			description:
				'Quality educational resources at teacher-friendly prices, with bulk discounts for schools',
			icon: '💰',
			color: 'pink'
		}
	];

	const testimonials = [
		{
			quote:
				'The CBC lesson plans have completely transformed how I approach my Grade 4 classes. My students are more engaged and the learning outcomes are clearly visible.',
			author: 'Grace Muthoni',
			role: 'Primary School Teacher, Nairobi',
			rating: 5
		},
		{
			quote:
				'As a head teacher, these resources have standardized our teaching approach. The schemes of work are detailed and the assessments are perfectly aligned with CBC requirements.',
			author: 'James Kipkemboi',
			role: 'Head Teacher, Eldoret',
			rating: 5
		},
		{
			quote:
				'The revision papers and exam materials have helped our students perform better. The quality is exceptional and saves us countless hours of preparation.',
			author: 'Mary Wanjiku',
			role: 'Secondary School Teacher, Mombasa',
			rating: 5
		}
	];

	const stats = [
		{ number: '50+', label: 'Active Teachers', color: 'text-red-600' },
		{ number: '500+', label: 'CBC Resources', color: 'text-blue-600' },
		{ number: '10,000+', label: 'Student Impacts', color: 'text-green-600' },
		{ number: '98%', label: 'Satisfaction Rate', color: 'text-purple-600' }
	];

	const subjects = [
		{ name: 'Mathematics', count: '120+ Resources', color: 'bg-red-100 text-red-800' },
		{ name: 'English', count: '95+ Resources', color: 'bg-blue-100 text-blue-800' },
		{ name: 'Kiswahili', count: '80+ Resources', color: 'bg-green-100 text-green-800' },
		{ name: 'Science', count: '110+ Resources', color: 'bg-purple-100 text-purple-800' },
		{ name: 'Social Studies', count: '75+ Resources', color: 'bg-yellow-100 text-yellow-800' },
		{ name: 'Creative Arts', count: '60+ Resources', color: 'bg-pink-100 text-pink-800' }
	];
</script>

<Hero />

<!-- Quick Stats Section -->
<Section class="bg-gray-50 py-8 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-3xl font-bold {stat.color} dark:{stat.color.replace('600', '400')} mb-1">
						{stat.number}
					</div>
					<div class="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Value Proposition -->
<Section name="feature" class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
				Why Choose CBC Resources Hub?
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				Designed by teachers, for teachers. Our comprehensive collection of CBC-aligned resources
				helps you deliver quality education while saving valuable preparation time.
			</p>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<Card
					class="border-gray-200 bg-white text-center transition-shadow duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:shadow-xl"
				>
					<div class="mb-4 text-5xl">{feature.icon}</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
					<p class="leading-relaxed text-gray-600 dark:text-gray-300">{feature.description}</p>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- Subject Areas -->
<Section class="bg-gray-50 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
				Comprehensive Subject Coverage
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				From Pre-Primary to Grade 6, we cover all CBC subjects with detailed resources
			</p>
		</div>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
			{#each subjects as subject}
				<div
					class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-2">
						<span
							class="inline-block rounded-full px-3 py-1 text-xs font-medium {subject.color} dark:{subject.color
								.replace('100', '900')
								.replace('800', '200')}"
						>
							{subject.name}
						</span>
					</div>
					<div class="text-sm text-gray-600 dark:text-gray-300">{subject.count}</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Featured Products -->
<Section name="feature" class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Featured Resources</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				Hand-picked quality resources that are most popular among teachers
			</p>
		</div>
		<div class="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
			{#each featuredProducts as product}
				<ResourceCard {product} />
			{/each}
		</div>
		<div class="mt-12 text-center">
			<Button href="/products" color="primary" size="lg">
				View All Resources
				<ArrowRightOutline class="ml-2" />
			</Button>
		</div>
	</div>
</Section>

<!-- How It Works -->
<Section class="bg-gray-50 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				Get started with CBC resources in three simple steps
			</p>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50"
				>
					<span class="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Browse & Search</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Explore our extensive catalog or search for specific resources by subject, grade, or type
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50"
				>
					<span class="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
					Purchase & Download
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Secure checkout with multiple payment options. Download your resources instantly
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50"
				>
					<span class="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Teach & Impact</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Use the resources in your classroom and see improved student engagement and outcomes
				</p>
			</div>
		</div>
	</div>
</Section>

<!-- Testimonials -->
<Section name="testimonial" class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
				What Teachers Are Saying
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				Real feedback from educators using our CBC resources across Kenya
			</p>
		</div>
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as testimonial}
				<Card
					class="border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:shadow-xl"
				>
					<div class="mb-4">
						<div class="mb-2 flex">
							{#each Array(testimonial.rating) as _}
								<StarOutline class="h-5 w-5 fill-current text-yellow-400" />
							{/each}
						</div>
						<div class="text-3xl text-gray-300 dark:text-gray-500">❝</div>
					</div>
					<p class="mb-6 leading-relaxed text-gray-600 italic dark:text-gray-300">
						{testimonial.quote}
					</p>
					<div class="border-t border-gray-100 pt-4 dark:border-gray-600">
						<p class="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
						<p class="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- Trust & Security -->
<Section class="bg-gray-50 py-12 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="grid gap-8 md:grid-cols-3">
				<div class="text-center">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50"
					>
						<CheckCircleOutline class="h-6 w-6 text-green-600 dark:text-green-400" />
					</div>
					<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Secure Payments</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						SSL encrypted transactions with M-Pesa and bank options
					</p>
				</div>
				<div class="text-center">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50"
					>
						<CheckCircleOutline class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					</div>
					<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Quality Guaranteed</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						All resources reviewed by CBC curriculum experts
					</p>
				</div>
				<div class="text-center">
					<div
						class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50"
					>
						<CheckCircleOutline class="h-6 w-6 text-purple-600 dark:text-purple-400" />
					</div>
					<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Instant Access</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">
						Download immediately after purchase, 24/7 availability
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- CTA Section -->
<Section name="cta" class="bg-primary-600 py-20 text-white">
	<div class="container mx-auto px-4 text-center">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-6 text-4xl font-bold">Ready to Transform Your Teaching?</h2>
			<p class="mb-8 text-xl leading-relaxed">
				Join over 2,500 teachers across Kenya who are using our CBC-aligned resources to deliver
				exceptional education and improve student outcomes.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
				<Button href="/sign-up" color="light" size="lg" class="font-semibold">
					Get Started Free
					<ArrowRightOutline class="ml-2" />
				</Button>
				<Button href="/contact" color="dark" size="lg" class="font-semibold">Contact Us</Button>
			</div>
			<p class="mt-6 text-sm opacity-90">
				No subscription fees • Instant downloads • Expert support
			</p>
		</div>
	</div>
</Section>
