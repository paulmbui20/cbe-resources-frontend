<script lang="ts">
	import { toastStore, type Toast } from '$lib/stores/toast';
	import { fly, fade } from 'svelte/transition';
	import { CircleCheckBig, CircleX, Info, TriangleAlert, X } from 'lucide-svelte';

	export let toast: Toast;

	const iconMap = {
		success: CircleCheckBig,
		error: CircleX,
		info: Info,
		warning: TriangleAlert
	};

	const colorMap = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800',
		warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
	};

	const iconColorMap = {
		success: 'text-green-400',
		error: 'text-red-400',
		info: 'text-blue-400',
		warning: 'text-yellow-400'
	};

	function dismiss() {
		toastStore.remove(toast.id);
	}
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg {colorMap[
		toast.type
	]}"
	transition:fly={{ x: -300, duration: 300 }}
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<svelte:component this={iconMap[toast.type]} class="h-6 w-6 {iconColorMap[toast.type]}" />
			</div>
			<div class="ml-3 w-0 flex-1 pt-0.5">
				{#if toast.title}
					<p class="text-sm font-medium">{toast.title}</p>
				{/if}
				<p class="text-sm {toast.title ? 'mt-1' : ''}">{toast.message}</p>
			</div>
			{#if toast.dismissible}
				<div class="ml-4 flex flex-shrink-0">
					<button
						type="button"
						class="inline-flex rounded-md hover:opacity-75 focus:ring-2 focus:ring-offset-2 focus:outline-none"
						on:click={dismiss}
					>
						<span class="sr-only">Close</span>
						<X class="h-5 w-5" />
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
