<!-- src/routes/accounts/password-reset/+layout.svelte -->
<script lang="ts">
	// This layout bypasses authentication and provides a clean base layout for password reset pages
</script>

<div class="min-h-screen">
	<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
		<div class="w-full max-w-md space-y-8">
			<!-- Logo/Brand section -->
			<div class="text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white">CBE Resources</h2>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Password Reset</p>
			</div>

			<!-- Main content card -->
			<div class="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
				<slot />

				<!-- Back to login link -->
				<div class="mt-6 text-center">
					<a
						href="/login"
						class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
					>
						← Back to sign in
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 
<style>
	.password-reset-container {
		@apply min-h-screen bg-gray-50 dark:bg-gray-900;
	}

	.password-reset-card {
		@apply rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800;
	}

	.password-reset-input {
		@apply w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400;
	}

	.password-reset-button {
		@apply group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-800;
	}

	.password-reset-link {
		@apply font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300;
	}

	.password-reset-label {
		@apply block text-sm font-medium text-gray-700 dark:text-gray-300;
	}

	.password-reset-description {
		@apply text-sm text-gray-600 dark:text-gray-400;
	}

	.password-reset-title {
		@apply text-2xl font-bold text-gray-900 dark:text-white;
	}

	/* OTP input specific styling */
	.otp-input {
		@apply w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-center font-mono text-lg tracking-widest text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-400;
	}

	/* Password strength indicator */
	.password-strength-bar {
		@apply h-1 flex-1 rounded-full;
	}

	.password-strength-weak {
		@apply bg-red-500;
	}

	.password-strength-fair {
		@apply bg-yellow-500;
	}

	.password-strength-good {
		@apply bg-green-500;
	}

	.password-strength-strong {
		@apply bg-green-600;
	}

	/* Loading spinner */
	.loading-spinner {
		@apply mr-2 h-4 w-4 animate-spin;
	}

	/* Success/Error indicators */
	.validation-success {
		@apply text-green-600 dark:text-green-400;
	}

	.validation-error {
		@apply text-red-600 dark:text-red-400;
	}

	/* Info boxes */
	.info-box {
		@apply rounded-md bg-blue-50 p-4 dark:bg-blue-900/20;
	}

	.info-text {
		@apply text-sm text-blue-700 dark:text-blue-300;
	}
</style> -->
