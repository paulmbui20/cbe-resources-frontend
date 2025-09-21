<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6">
		<h1 class="text-3xl font-bold">My Account</h1>
		<p class="text-sm text-gray-600">Manage your profile, purchases and downloads</p>
	</div>

	<div class="flex flex-col gap-8 lg:flex-row">
		<!-- Sidebar Navigation -->
		<aside class="w-full lg:w-64">
			<div class="rounded-lg bg-white p-4 shadow">
				<nav class="flex flex-col space-y-1">
					<a
						href="/account/settings"
						class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
						>Settings</a
					>
					<a
						href="/account/purchases"
						class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
						>Purchases</a
					>
					<a
						href="/account/downloads"
						class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
						>Downloads</a
					>
					<a
						href="/account/analytics"
						class="block rounded-md px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
						>Analytics</a
					>
					<button
						class="mt-4 w-full rounded-md border px-3 py-2 text-left text-red-600 hover:bg-red-50"
						on:click={() => goto('/login')}>Sign Out</button
					>
				</nav>
			</div>
		</aside>

		<!-- Main Content Area -->
		<main class="flex-1">
			<div class="rounded-lg bg-white p-6 shadow">
				<slot />
			</div>
		</main>
	</div>
</div>
