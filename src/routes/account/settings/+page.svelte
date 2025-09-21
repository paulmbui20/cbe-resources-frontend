<script lang="ts">
	import { Button, Label, Input } from 'flowbite-svelte';
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Account Settings</h2>

	<form class="space-y-6" on:submit|preventDefault>
		<!-- Personal Information -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Personal Information</h3>

			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" type="text" required />
				</div>
				<div>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" type="text" required />
				</div>
			</div>

			<div>
				<Label for="email">Email Address</Label>
				<Input id="email" type="email" required />
			</div>

			<div>
				<Label for="phone">Phone Number</Label>
				<Input id="phone" type="tel" />
			</div>
		</div>

		<!-- Password Change -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Change Password</h3>

			<div>
				<Label for="currentPassword">Current Password</Label>
				<Input id="currentPassword" type="password" />
			</div>

			<div>
				<Label for="newPassword">New Password</Label>
				<Input id="newPassword" type="password" />
			</div>

			<div>
				<Label for="confirmPassword">Confirm New Password</Label>
				<Input id="confirmPassword" type="password" />
			</div>
		</div>

		<!-- Notification Preferences -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Notification Preferences</h3>

			<div class="space-y-2">
				<label class="flex items-center space-x-2">
					<input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
					<span>Email notifications for new resources</span>
				</label>

				<label class="flex items-center space-x-2">
					<input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
					<span>Newsletter and updates</span>
				</label>
			</div>
		</div>

		<div class="flex justify-end space-x-4">
			<Button type="button" color="light">Cancel</Button>
			<Button type="submit" color="primary">Save Changes</Button>
		</div>
	</form>
</div>
