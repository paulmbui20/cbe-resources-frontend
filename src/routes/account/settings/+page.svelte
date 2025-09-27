<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Label, Input } from 'flowbite-svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { auth } from '$lib/stores/auth';

	let loading = false;
	let saving = false;
	let changingPassword = false;

	// Profile model matches backend sample
	let profile: any = {
		id: null,
		email: '',
		username: '',
		first_name: '',
		last_name: '',
		phone_number: '',
		bio: '',
		avatar_url: null,
		is_vendor: false,
		is_verified: false,
		email_notifications: true,
		sms_notifications: false,
		full_name: '',
		display_name: ''
	};

	// Password fields
	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	async function loadProfile() {
		loading = true;
		try {
			const res = await apiService.getProfile();
			if (res.status === 200 && res.data) {
				profile = { ...profile, ...res.data };
				// Update auth store user too
				try {
					await auth.loadProfile();
				} catch (e) {
					// ignore
				}
			} else {
				toastStore.error(res.message || 'Failed to load profile');
			}
		} catch (e) {
			toastStore.error('Network error while loading profile');
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadProfile();
	});

	async function saveProfile() {
		saving = true;
		try {
			const payload = {
				first_name: profile.first_name,
				last_name: profile.last_name,
				email: profile.email,
				phone_number: profile.phone_number,
				bio: profile.bio,
				display_name: profile.display_name
			};

			const res = await apiService.updateProfile(payload);
			if (res.status === 200 && res.data) {
				toastStore.success('Profile updated successfully');
				// refresh auth store
				try {
					await auth.loadProfile();
				} catch (e) {
					console.debug('Failed to refresh auth profile after update');
				}
			} else {
				if (res.errors) {
					const messages = Object.values(res.errors).flat().join(', ');
					toastStore.error(messages, 'Validation Error');
				} else {
					toastStore.error(res.message || 'Failed to update profile');
				}
			}
		} catch (e) {
			toastStore.error('Network error while updating profile');
		} finally {
			saving = false;
		}
	}

	async function changeUserPassword() {
		if (newPassword !== confirmPassword) {
			toastStore.error('New passwords do not match');
			return;
		}

		changingPassword = true;
		try {
			const res = await apiService.changePassword({
				old_password: currentPassword,
				new_password: newPassword,
				new_password_confirm: confirmPassword
			});
			if (res.status === 200 && res.data) {
				toastStore.success(res.message || 'Password changed successfully');
				// If backend returns new tokens, persist them via auth.refresh or other flow
				try {
					if (res.data.tokens) {
						// attempt to update auth state by reading tokens (auth store expects API responses on login/register)
						// For now, run auth.refresh to ensure tokens are valid
						await auth.refresh();
					}
				} catch (e) {
					console.debug('Failed to refresh tokens after password change');
				}
				// clear password fields
				currentPassword = '';
				newPassword = '';
				confirmPassword = '';
			} else {
				if (res.errors) {
					const messages = Object.values(res.errors).flat().join(', ');
					toastStore.error(messages, 'Validation Error');
				} else {
					toastStore.error(res.message || 'Failed to change password');
				}
			}
		} catch (e) {
			toastStore.error('Network error while changing password');
		} finally {
			changingPassword = false;
		}
	}
</script>

<div class="space-y-6">
	<h2 class="text-2xl font-bold">Account Settings</h2>

	<form class="space-y-6" on:submit|preventDefault={saveProfile}>
		<!-- Personal Information -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Personal Information</h3>

			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" type="text" bind:value={profile.first_name} />
				</div>
				<div>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" type="text" bind:value={profile.last_name} />
				</div>
			</div>

			<div>
				<Label for="email">Email Address</Label>
				<Input id="email" type="email" bind:value={profile.email} required />
			</div>

			<div>
				<Label for="phone">Phone Number</Label>
				<Input id="phone" type="tel" bind:value={profile.phone_number} />
			</div>
		</div>

		<!-- Notification Preferences -->
		<div class="space-y-4">
			<h3 class="text-xl font-semibold">Notification Preferences</h3>

			<div class="space-y-2">
				<label class="flex items-center space-x-2">
					<input
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300"
						bind:checked={profile.email_notifications}
					/>
					<span>Email notifications for new resources</span>
				</label>

				<label class="flex items-center space-x-2">
					<input
						type="checkbox"
						class="h-4 w-4 rounded border-gray-300"
						bind:checked={profile.sms_notifications}
					/>
					<span>SMS notifications</span>
				</label>
			</div>
		</div>

		<div class="flex justify-end space-x-4">
			<button type="button" color="light" on:click={loadProfile}>Cancel</button>
			<Button type="submit" color="primary" disabled={saving}
				>{saving ? 'Saving...' : 'Save Changes'}</Button
			>
		</div>
	</form>

	<!-- Password Change -->
	<div class="space-y-6">
		<h3 class="text-xl font-semibold">Change Password</h3>
		<div>
			<Label for="currentPassword">Current Password</Label>
			<Input id="currentPassword" type="password" bind:value={currentPassword} />
		</div>

		<div>
			<Label for="newPassword">New Password</Label>
			<Input id="newPassword" type="password" bind:value={newPassword} />
		</div>

		<div>
			<Label for="confirmPassword">Confirm New Password</Label>
			<Input id="confirmPassword" type="password" bind:value={confirmPassword} />
		</div>

		<div class="flex justify-end">
			<button
				type="button"
				color="primary"
				on:click={changeUserPassword}
				disabled={changingPassword}>{changingPassword ? 'Changing...' : 'Change Password'}</button
			>
		</div>
	</div>
</div>
