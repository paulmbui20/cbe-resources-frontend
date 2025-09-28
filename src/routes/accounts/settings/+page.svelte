<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Label, Input } from 'flowbite-svelte';
	import { apiService } from '$lib/api';
	import { toastStore } from '$lib/stores/toast';
	import { auth } from '$lib/stores/auth';

	let loading = false;
	let saving = false;
	let changingPassword = false;

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

	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	// Live validation state
	let emailAvailable: boolean | null = null;
	let usernameAvailable: boolean | null = null;
	let initialEmail = '';
	let initialUsername = '';

	// debounce helper (same approach as signup page)
	function debounce(fn: Function, wait = 400) {
		let t: any;
		return (...args: any[]) => {
			clearTimeout(t);
			t = setTimeout(() => fn(...args), wait);
		};
	}

	const checkEmailDebounced = debounce(async (value: string) => {
		if (!value) return (emailAvailable = null);
		// if unchanged from initial, treat as available
		if (value === initialEmail) return (emailAvailable = true);
		try {
			const res = await apiService.checkEmail(value);
			emailAvailable = res.status === 200 ? !!res.data?.available : null;
		} catch (e) {
			emailAvailable = null;
		}
	}, 500);

	const checkUsernameDebounced = debounce(async (value: string) => {
		if (!value) return (usernameAvailable = null);
		if (value === initialUsername) return (usernameAvailable = true);
		try {
			const res = await apiService.checkUsername(value);
			usernameAvailable = res.status === 200 ? !!res.data?.available : null;
		} catch (e) {
			usernameAvailable = null;
		}
	}, 500);

	async function loadProfile() {
		loading = true;
		try {
			const res = await apiService.getProfile();
			if (res.status === 200 && res.data) {
				profile = { ...profile, ...res.data };
				// capture initial values so we don't flag them as taken
				initialEmail = profile.email ?? '';
				initialUsername = profile.username ?? '';
				// initialize availability as true for unchanged values
				emailAvailable = true;
				usernameAvailable = true;
				try {
					await auth.loadProfile();
				} catch (e) {}
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
			// Prevent saving if email/username checks indicate conflict
			if (emailAvailable === false) {
				toastStore.error('The provided email is already in use');
				saving = false;
				return;
			}
			if (usernameAvailable === false) {
				toastStore.error('The provided username is already taken');
				saving = false;
				return;
			}
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
				try {
					await auth.loadProfile();
				} catch (e) {}
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

	// reactive watchers to perform debounced checks when fields change
	$: if (profile?.email !== undefined) checkEmailDebounced(profile.email);
	$: if (profile?.username !== undefined) checkUsernameDebounced(profile.username);

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
				try {
					if (res.data.tokens) {
						await auth.refresh();
					}
				} catch (e) {}
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
	<h2 class="text-2xl font-bold dark:text-white">Account Settings</h2>

	<form class="space-y-6" on:submit|preventDefault={saveProfile}>
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
