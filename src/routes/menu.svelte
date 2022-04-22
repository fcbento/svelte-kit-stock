<script>
	import { Router } from 'svelte-routing';
	import { onMount } from 'svelte';
	import User from './user.svelte';
	import Category from './category.svelte';
	import Product from './product.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Home from './home.svelte';
	import { Utils } from '../utils/utils';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	let canSee = false;
	const utils = new Utils();

	onMount(async () => {
		const isAdmin = utils
			.getInfo()
			.authorities.filter((item) => item.authority === 'ROLE_ADMIN');
		isAdmin.length > 0 ? (canSee = true) : (canSee = false);
	});

	const logout = () => {
		window.location.assign('http://localhost:3000/login');
	};

	let active = 'Home';
</script>

<LayoutGrid fixedColumnWidth>
	<Cell span={12}>
		<Router>
			<button on:click={logout}>Logout</button>

			<TabBar tabs={['Home', 'Users', 'Products', 'Categories']} let:tab bind:active>
				<Tab {tab}>
					<Label>{tab}</Label>
				</Tab>
			</TabBar>

			<div class="status">
				{#if active === 'Home'}
					<Home />
				{/if}

				{#if active === 'Users' && canSee}
					<User />
				{/if}

				{#if active === 'Products'}
					<Product />
				{/if}

				{#if active === 'Categories'}
					<Category />
				{/if}
			</div>
		</Router>
	</Cell>
</LayoutGrid>
