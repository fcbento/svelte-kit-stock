<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { UsersColumns, UsersHeaders } from '../models/users/users-table';
	import Table from '../components/table.svelte';
	import { fetchUsers, users } from '../stores/users';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';

	const headers: TableHeader[] = UsersHeaders;
	const columns: TableColumn[] = UsersColumns;
	let pagination: Pagination;

	const usersStore: TableData = $users;

	const fetchUsersPaginated = () => {
		fetchUsers(pagination.rowsPerPage, pagination.page);
	};
</script>

<LayoutGrid>
	<Cell span={12}>
		<Table
			{headers}
			{columns}
			tableDataSource={usersStore}
			showCheckbox={true}
			bind:value={pagination}
			on:submit={fetchUsersPaginated}
		/>
	</Cell>
</LayoutGrid>
