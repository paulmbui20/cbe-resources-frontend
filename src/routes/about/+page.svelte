<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import { Button, Card } from 'flowbite-svelte';
	import userprofile from '$lib/assets/user-profile-icon.svg';
	import femaleicon from '$lib/assets/female-icon.svg';
	import {
		ArrowRightOutline,
		CheckCircleOutline,
		HeartOutline,
		BookOpenOutline,
		UsersOutline
	} from 'flowbite-svelte-icons';

	const team = [
		{
			name: 'Dr. Sarah Wanjiku',
			role: 'Educational Director & Founder',
			bio: "Former CBC implementation specialist with 18 years in Kenya's education sector. PhD in Curriculum Development from University of Nairobi.",
			image: femaleicon,
			specialization: 'CBC Policy & Implementation'
		},
		{
			name: 'Michael Kiprotich',
			role: 'Content Development Lead',
			bio: 'Master teacher trainer with expertise in primary mathematics and science. Creator of award-winning CBC lesson plans.',
			image: userprofile,
			specialization: 'STEM Education'
		},
		{
			name: 'Grace Achieng',
			role: 'Teacher Community Manager',
			bio: 'Experienced educator and teacher mentor with deep understanding of classroom challenges and solutions.',
			image: femaleicon,
			specialization: 'Teacher Training & Support'
		},
		{
			name: 'James Mwangi',
			role: 'Quality Assurance Director',
			bio: 'Former Kenya Institute of Education consultant. Ensures all resources meet CBC standards and learning outcomes.',
			image: userprofile,
			specialization: 'Curriculum Alignment'
		}
	];

	const values = [
		{
			icon: '🎯',
			title: 'Excellence in Education',
			description:
				'We maintain the highest standards in all our educational resources, ensuring they meet CBC requirements and support effective learning outcomes.',
			color: 'red'
		},
		{
			icon: '🤝',
			title: 'Teacher Empowerment',
			description:
				"We believe in empowering teachers with the tools and resources they need to succeed, recognizing their crucial role in shaping Kenya's future.",
			color: 'blue'
		},
		{
			icon: '💡',
			title: 'Innovation & Accessibility',
			description:
				'We continuously innovate to make quality educational resources affordable and accessible to teachers across Kenya.',
			color: 'green'
		},
		{
			icon: '🌍',
			title: 'Community Impact',
			description:
				"We're committed to improving education outcomes for all Kenyan children through collaborative efforts with educators.",
			color: 'purple'
		}
	];

	const milestones = [
		{
			year: 'December 2024',
			title: 'Idea conception',
			description:
				'Developed a concept for a new platform to support teachers in delivering quality education',
			icon: '💡'
		},
		{
			year: 'January 2025',
			title: 'Initial market research',
			description: 'Conducted initial market research with teachers in Kenya',
			icon: '🔎'
		},
		{
			year: 'August 2025',
			title: 'Development and prototyping',
			description: 'Developed and prototyped the platform',
			icon: '🚧'
		},
		{
			year: 'September 2025',
			title: 'Initial launch',
			description: 'Launched the platform in Kenya',
			icon: '🚀'
		}
	];

	const achievements = [
		{ number: '500+', label: 'Teachers Served' },
		{ number: '500+', label: 'CBC Resources' },
		{ number: '47', label: 'Counties Reached' },
		{ number: '10,000+', label: 'Students Impacted' },
		{ number: '98%', label: 'Teacher Satisfaction' },
		{ number: '24/7', label: 'Platform Availability' }
	];

	const partnerships = [
		{
			name: 'Kenya Institute of Curriculum Development (KICD)',
			description: 'Collaborating on CBC resource alignment and quality assurance',
			type: 'Government Partnership'
		},
		{
			name: 'Teachers Service Commission (TSC)',
			description: 'Supporting teacher professional development initiatives',
			type: 'Professional Development'
		},
		{
			name: 'Kenya Primary School Heads Association',
			description: 'Facilitating school-wide resource implementation programs',
			type: 'Educational Leadership'
		}
	];
</script>

<svelte:head>
	<title>About Us - CBC Resources Hub | Supporting Kenyan Educators</title>
	<meta
		name="description"
		content="Learn about our mission to support teachers with quality CBC-aligned educational resources. Meet our team of education experts dedicated to transforming learning in Kenya."
	/>
	<meta property="og:title" content="About CBC Resources Hub - Supporting Kenyan Educators" />
	<meta
		property="og:description"
		content="Meet the team behind CBC Resources Hub and learn about our mission to support teachers with CBC-aligned materials across Kenya."
	/>
	<meta
		name="keywords"
		content="about CBC resources, educational team Kenya, teacher support, CBC curriculum experts"
	/>
</svelte:head>

<!-- Hero Section -->
<Section class="bg-gradient-to-r from-primary-500 to-primary-700 py-20 text-white">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-6 text-5xl leading-tight font-bold">About CBC Resources Hub</h1>
			<p class="mb-8 text-xl leading-relaxed opacity-90">
				Empowering teachers across Kenya with quality CBC-aligned resources, professional
				development, and community support to deliver exceptional education.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
				<Button href="/products" color="light" size="lg" class="font-semibold">
					Explore Resources
					<ArrowRightOutline class="ml-2" />
				</Button>
				<Button href="/contact" color="dark" size="lg" class="font-semibold">Get in Touch</Button>
			</div>
		</div>
	</div>
</Section>

<!-- Quick Stats -->
<Section class="bg-gray-50 py-12 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
			{#each achievements as achievement}
				<div class="text-center">
					<div class="mb-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
						{achievement.number}
					</div>
					<div class="text-sm text-gray-600 dark:text-gray-300">{achievement.label}</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Mission & Vision -->
<Section class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">Our Mission & Vision</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Driving educational excellence through innovative resources and teacher empowerment
				</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-2">
				<Card
					class="border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-8 dark:border-red-700/50 dark:from-red-900/20 dark:to-red-800/20"
				>
					<div class="mb-6">
						<div
							class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-800/50"
						>
							<HeartOutline class="h-8 w-8 text-red-600 dark:text-red-400" />
						</div>
						<h3 class="mb-4 text-3xl font-bold text-red-900 dark:text-red-100">Our Mission</h3>
					</div>
					<p class="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
						To empower teachers across Kenya with high-quality, CBC-aligned educational resources
						that enhance student learning outcomes, reduce preparation time, and make
						competency-based education more accessible, effective, and enjoyable for both educators
						and students.
					</p>
				</Card>

				<Card
					class="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 dark:border-blue-700/50 dark:from-blue-900/20 dark:to-blue-800/20"
				>
					<div class="mb-6">
						<div
							class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/50"
						>
							<BookOpenOutline class="h-8 w-8 text-blue-600 dark:text-blue-400" />
						</div>
						<h3 class="mb-4 text-3xl font-bold text-blue-900 dark:text-blue-100">Our Vision</h3>
					</div>
					<p class="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
						To be Kenya's leading platform for CBC educational resources, fostering a vibrant
						community where teachers can access, share, and implement innovative teaching materials
						that drive student success and transform the educational landscape across the nation.
					</p>
				</Card>
			</div>
		</div>
	</div>
</Section>

<!-- Our Values -->
<Section class="bg-gray-50 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					The principles that guide everything we do
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each values as value}
					<Card
						class="border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-xl"
					>
						<div class="mb-6 text-5xl">{value.icon}</div>
						<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h3>
						<p class="leading-relaxed text-gray-600 dark:text-gray-300">{value.description}</p>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- Our Story -->
<Section class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-12 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					From classroom challenges to nationwide impact
				</p>
			</div>

			<div class="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
				<div class="mb-8">
					<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">The Beginning</h3>
					<p class="leading-relaxed">
						CBC Resources Hub was born from the real experiences of Kenyan teachers who faced the
						challenges of transitioning to the Competency-Based Curriculum. Our founder, Dr. Sarah
						Wanjiku, witnessed firsthand how teachers struggled to find quality, aligned resources
						that met CBC requirements while being practical for classroom use.
					</p>
				</div>

				<div class="mb-8">
					<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">The Solution</h3>
					<p class="leading-relaxed">
						Starting in early 2023, we assembled a team of passionate educators, curriculum
						developers, and education technology experts. We began by conducting extensive research
						with teachers across Kenya, understanding their specific needs, challenges, and what
						would truly make their teaching more effective.
					</p>
				</div>

				<div class="mb-8">
					<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">The Growth</h3>
					<p class="leading-relaxed">
						What started as a small collection of 50 resources has grown into a comprehensive
						library of over 500 CBC-aligned materials. We've expanded our reach to serve teachers in
						all 47 counties, building partnerships with educational institutions and government
						bodies to ensure our resources meet the highest standards.
					</p>
				</div>

				<div>
					<h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">The Impact</h3>
					<p class="leading-relaxed">
						Today, we're proud to serve over 2,500 teachers across Kenya, impacting the education of
						more than 50,000 students. Our resources are used in urban and rural schools alike,
						helping to standardize quality education delivery while respecting local contexts and
						needs.
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- Journey Timeline -->
<Section class="bg-gray-50 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Key milestones in our mission to transform education in Kenya
				</p>
			</div>

			<div class="relative">
				<!-- Timeline line -->
				<div
					class="absolute top-0 bottom-0 left-8 w-0.5 bg-primary-200 md:left-1/2 md:-translate-x-px md:transform dark:bg-primary-700"
				></div>

				{#each milestones as milestone, index}
					<div class="relative mb-12 flex items-center">
						<!-- Timeline dot -->
						<div
							class="absolute left-8 h-4 w-4 -translate-x-2 transform rounded-full bg-primary-600 md:left-1/2 md:-translate-x-2 md:transform dark:bg-primary-400"
						></div>

						<!-- Content -->
						<div
							class="ml-16 md:ml-0 md:w-1/2 {index % 2 === 0
								? 'md:pr-8 md:text-right'
								: 'md:ml-auto md:pl-8'}"
						>
							<Card
								class="border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-xl"
							>
								<div class="mb-4">
									<span class="text-3xl">{milestone.icon}</span>
									<span class="ml-3 text-xl font-bold text-primary-600 dark:text-primary-400"
										>{milestone.year}</span
									>
								</div>
								<h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
									{milestone.title}
								</h3>
								<p class="leading-relaxed text-gray-600 dark:text-gray-300">
									{milestone.description}
								</p>
							</Card>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- Team Section -->
<Section class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Education experts passionate about transforming teaching and learning in Kenya
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each team as member}
					<Card
						class="border border-gray-200 bg-white p-6 text-center transition-shadow duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:hover:shadow-xl"
					>
						<img
							src={member.image}
							alt={member.name}
							class="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-gray-100 object-cover shadow-lg dark:border-gray-600"
						/>
						<h3 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
						<p class="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400">
							{member.role}
						</p>
						<p class="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
							{member.bio}
						</p>
						<div class="border-t border-gray-100 pt-4 dark:border-gray-600">
							<span
								class="inline-block rounded-full bg-primary-100 px-3 py-2 text-xs font-medium text-primary-800 dark:bg-primary-900/50 dark:text-primary-300"
							>
								{member.specialization}
							</span>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- Partnerships -->
<Section class="bg-gray-50 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Our Partners</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					Collaborating with leading educational institutions to serve teachers better
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				{#each partnerships as partnership}
					<Card
						class="border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-xl"
					>
						<div class="mb-6">
							<UsersOutline class="mb-4 h-10 w-10 text-primary-600 dark:text-primary-400" />
							<span
								class="inline-block rounded-full bg-primary-100 px-3 py-2 text-xs font-medium text-primary-800 dark:bg-primary-900/50 dark:text-primary-300"
							>
								{partnership.type}
							</span>
						</div>
						<h3 class="mb-4 text-lg leading-tight font-semibold text-gray-900 dark:text-white">
							{partnership.name}
						</h3>
						<p class="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
							{partnership.description}
						</p>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- Why We Matter -->
<Section class="bg-white py-16 dark:bg-gray-800">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<div class="mb-12 text-center">
				<h2 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Why We Matter</h2>
				<p class="text-lg text-gray-600 dark:text-gray-300">
					The challenges we're solving in Kenya's education sector
				</p>
			</div>

			<div class="grid gap-12 md:grid-cols-2">
				<div>
					<h3 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">The Challenge</h3>
					<div class="space-y-4">
						<div class="flex items-start">
							<div class="mt-2 mr-4 h-3 w-3 flex-shrink-0 rounded-full bg-red-500"></div>
							<p class="text-gray-600 dark:text-gray-300">
								Teachers spending 15+ hours weekly creating resources from scratch
							</p>
						</div>
						<div class="flex items-start">
							<div class="mt-2 mr-4 h-3 w-3 flex-shrink-0 rounded-full bg-red-500"></div>
							<p class="text-gray-600 dark:text-gray-300">
								Inconsistent CBC implementation across different schools
							</p>
						</div>
						<div class="flex items-start">
							<div class="mt-2 mr-4 h-3 w-3 flex-shrink-0 rounded-full bg-red-500"></div>
							<p class="text-gray-600 dark:text-gray-300">
								Limited access to quality, curriculum-aligned materials
							</p>
						</div>
						<div class="flex items-start">
							<div class="mt-2 mr-4 h-3 w-3 flex-shrink-0 rounded-full bg-red-500"></div>
							<p class="text-gray-600 dark:text-gray-300">
								Rural schools struggling with resource accessibility
							</p>
						</div>
					</div>
				</div>

				<div>
					<h3 class="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Our Solution</h3>
					<div class="space-y-4">
						<div class="flex items-start">
							<CheckCircleOutline
								class="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400"
							/>
							<p class="text-gray-600 dark:text-gray-300">
								Ready-to-use CBC resources saving 10+ hours weekly
							</p>
						</div>
						<div class="flex items-start">
							<CheckCircleOutline
								class="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400"
							/>
							<p class="text-gray-600 dark:text-gray-300">
								Standardized, expert-reviewed materials ensuring quality
							</p>
						</div>
						<div class="flex items-start">
							<CheckCircleOutline
								class="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400"
							/>
							<p class="text-gray-600 dark:text-gray-300">
								Digital platform accessible from anywhere in Kenya
							</p>
						</div>
						<div class="flex items-start">
							<CheckCircleOutline
								class="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-green-500 dark:text-green-400"
							/>
							<p class="text-gray-600 dark:text-gray-300">
								Affordable pricing with mobile money payment options
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- Join Our Mission CTA -->
<Section class="bg-primary-700 py-20 text-white">
	<div class="container mx-auto px-4 text-center">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-6 text-4xl font-bold">Join Our Mission</h2>
			<p class="mb-8 text-xl leading-relaxed opacity-90">
				Be part of Kenya's educational transformation. Together, we can ensure every child receives
				quality education through empowered, well-equipped teachers.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
				<Button href="/sign-up" color="light" size="lg" class="font-semibold">
					Start Teaching Better
					<ArrowRightOutline class="ml-2" />
				</Button>
				<Button href="/contact" color="dark" size="lg" class="font-semibold">
					Partner With Us
				</Button>
			</div>
			<p class="mt-8 text-sm opacity-80">
				Join 2,500+ teachers already transforming education across Kenya
			</p>
		</div>
	</div>
</Section>
