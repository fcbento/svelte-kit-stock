<script>
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import Error from '../components/error.svelte';
	import Icon from '@smui/textfield/icon';
	import { User } from '../stores/user';
	import { goto } from '$app/navigation';
	const errorMessage = 'Something went wrong. Please verify entered values';

	const user = new User();

	let error = false;
	let email = '';
	let password = '';

	const loginUser = () => {
		
		if (!email || !password) return;

		user.login(email, password).then((res) => {
			if (res.status === 200) {
				goto(`/menu`);
			} else {
				error = true;
				handleError();
			}
		});
	};

	const forgotPassword = () => {
		console.log('forgotPassword');
	};

	const handleError = () => {
		setTimeout(() => {
			error = false;
		}, 9000);
	};

	const handleKeydown = (event) => {
		if (event.keyCode === 13) loginUser();
	};
</script>

<Card style="width: 60%; margin-top: 300px; margin-left: 150px">
	<Content on:keydown={handleKeydown}>
		<Textfield type="email" label="Email" bind:value={email} style="min-width: 100%;">
			<Icon class="material-icons" slot="leadingIcon">email</Icon>
		</Textfield>
		<br />

		<Textfield type="password" label="Password" bind:value={password} style="min-width: 100%;">
			<Icon class="material-icons" slot="leadingIcon">lock</Icon>
		</Textfield>
	</Content>

	<Actions>
		<Button on:click={loginUser}>
			<Label>Login</Label>
		</Button>

		<Button on:click={forgotPassword}>
			<Label>Forgot Password</Label>
		</Button>
	</Actions>
</Card>

{#if error}
	<Error message={errorMessage} />
{/if}
