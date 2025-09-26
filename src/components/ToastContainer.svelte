<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import Toast from './Toast.svelte';
</script>

<!-- Toast Container - positioned at top right, below navbar -->
<div
	class="pointer-events-none fixed inset-0 z-50 flex items-start justify-end px-4 pt-20 sm:pt-24"
>
	<div class="flex w-full flex-col items-end space-y-4 sm:w-auto">
		{#each $toastStore as toast (toast.id)}
			<Toast {toast} />
		{/each}
	</div>
</div>
