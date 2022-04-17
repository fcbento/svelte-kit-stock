<script lang="ts">
	import type { SnackbarComponentDev } from '@smui/snackbar';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { onMount } from 'svelte';

	let snackbarWithClose: SnackbarComponentDev;
	export let message;

	onMount(async () => {
		snackbarWithClose.open();
	});
	
</script>

<Snackbar bind:this={snackbarWithClose}>
	<Label>{message}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
