<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { CategoryColumns, CategoryHeaders } from '../models/category';
	import Table from '../components/table.svelte';
	import { fetchCategories, categories } from '../stores/category';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';

	let headers: TableHeader[] = CategoryHeaders;
	let columns: TableColumn[] = CategoryColumns;
	let pagination: Pagination;

	const categoryStore: TableData = $categories;

	const fetchUsersPaginated = () => {
		fetchCategories(pagination.rowsPerPage, pagination.page);
	};
</script>

<LayoutGrid>
	<Cell span={12}>
		<Table
			{headers}
			{columns}
			tableDataSource={categoryStore}
			showCheckbox={true}
			bind:value={pagination}
			on:submit={fetchUsersPaginated}
		/>
	</Cell>
</LayoutGrid>
