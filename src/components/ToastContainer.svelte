<script lang="ts">
	import { toastStore } from '$lib/stores/toast';
	import Toast from './Toast.svelte';
</script>

<!-- Toast Container - top right, below navbar -->
<div
	class="pointer-events-none fixed inset-0 z-50 flex flex-col items-end px-4 py-6 sm:p-6"
	style="margin-top: 4rem;"
>
	<div class="flex w-full max-w-sm flex-col items-end space-y-4">
		{#each $toastStore as toast (toast.id)}
			<Toast {toast} />
		{/each}
	</div>
</div>
