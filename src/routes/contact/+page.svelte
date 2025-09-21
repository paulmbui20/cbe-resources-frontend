<script lang="ts">
	import { Section, Contact } from 'flowbite-svelte-blocks';
	import { Label, Input, Textarea, Button } from 'flowbite-svelte';
</script>

<Section name="contact" class="mx-auto max-w-4xl py-12">
	<Contact>
		{#snippet h2()}Contact Us{/snippet}
		{#snippet paragraph()}Got a technical issue? Want to send feedback about a beta feature? Need
			details about our Business plan? Let us know.{/snippet}
		<form class="space-y-8">
			<div>
				<Label for="email" class="mb-2 block">Your email</Label>
				<Input id="email" name="email" placeholder="name@flowbite.com" required />
			</div>
			<div>
				<Label for="subject" class="mb-2 block">Subject</Label>
				<Input id="subject" name="subject" placeholder="Let us know how we can help you" required />
			</div>
			<div>
				<Label for="textarea-id" class="mb-2">Your message</Label>
				<Textarea class="w-full" id="subject" name="subject" placeholder="Leave a comment..." />
			</div>
			<Button>Send message</Button>
		</form>
	</Contact>
</Section>
