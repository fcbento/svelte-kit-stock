<script lang="ts">
	import { UsersColumns, UsersHeaders, UserFormBuilder } from '../models/users';
	import { fetchUsers, users, create, remove } from '../stores/users';
	import { formValues } from '../stores/form';
	import { selectedValues } from '../stores/table';
	import Table from '../components/table.svelte';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import Form from '../components/form.svelte';
	import Button, { Label } from '@smui/button';
	import Badge from '@smui-extra/badge';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';

	const headers: TableHeader[] = UsersHeaders;
	const columns: TableColumn[] = UsersColumns;
	const usersStore: TableData = $users;

	let pagination: Pagination;
	let usersList = false;
	let addUser = false;
	let formFields = UserFormBuilder();

	const fetchUsersPaginated = () => {
		fetchUsers(pagination.rowsPerPage, pagination.page);
	};

	const removeUser = () => {
		$selectedValues.forEach((item) => {
			delete item.profiles;
		})
		remove($selectedValues);
	}

	const registerUser = () => {
		create($formValues);
	}
</script>

<div class="accordion-container">
	<Accordion>
		<Panel bind:open={usersList}>
			<Header>
				Products List
				<span slot="description"> Total: {usersStore.totalElements}</span>
				<IconButton slot="icon" toggle pressed={usersList}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>

			<Content>
				<Table
					{headers}
					{columns}
					tableDataSource={usersStore}
					showCheckbox={true}
					bind:value={pagination}
					on:submit={fetchUsersPaginated}
					showDeleteButton={true}
				/>
				{#if $selectedValues.length > 0}
					<Button style="position: relative; margin-top: 10px;" on:click={removeUser}>
						<Label>Remove</Label>
						<Badge aria-label="new messages count">{$selectedValues.length }</Badge>
				  	</Button>
				{/if}
			</Content>
		</Panel>

		<Panel bind:open={addUser}>
			<Header>
				Add Product
				<IconButton slot="icon" toggle pressed={addUser}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>

			<Content>
				<Form on:submit={registerUser} bind:fields={formFields} />
			</Content>
		</Panel>
	</Accordion>
</div>