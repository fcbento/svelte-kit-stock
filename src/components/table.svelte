<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Checkbox from '@smui/checkbox';
	import { afterUpdate, onMount } from 'svelte';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { createEventDispatcher } from 'svelte';
	import { TableColumns } from '../utils/table-columns';
	import {selectedValues} from '../stores/table';
	import type { TableColumn, TableData, TableHeader } from 'src/models/table';

	export let tableDataSource: TableData;
	export let headers: TableHeader[];
	export let columns: TableColumn[];
	export let showCheckbox: boolean;
	export let value = {};
	export let showDeleteButton: boolean;

	const tableColumns = new TableColumns();

	let selected = [];
	let rowsPerPage = 10;
	let currentPage = 0;
	let end = 0;
	let start = 0;

	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');
	const click = () => dispatch('click');

	onMount(async () => {
		setStartEnd(tableDataSource.number);
	});

	const paginate = (type: string): void => {
		getPagedType(type);
		emitPaginationValues(rowsPerPage);
		setStartEnd(currentPage);
	};

	const eventChange = (rowsPerPage: number): void => {
		emitPaginationValues(rowsPerPage);
		setStartEnd(currentPage);
	};

	const emitPaginationValues = (rowsPerPage = 10): void => {
		value = { rowsPerPage, page: currentPage };
		submit();
	};

	const setStartEnd = (page: number): void => {
		start = page * rowsPerPage;
		end = Math.min(start + rowsPerPage, tableDataSource.totalElements);
	};

	const getPagedType = (type: string): number => {
		const types = {
			first: () => (currentPage = 0),
			prev: () => currentPage--,
			next: () => currentPage++,
			last: () => (currentPage = tableDataSource.totalPages - 1)
		};
		return types[type]();
	};

	afterUpdate(() => {
		selectedValues.set(selected);
		click();
	});

</script>

<!-- svelte-ignore missing-declaration -->

<DataTable style="width: 100%">
	<Head>
		<Row>
			{#if showCheckbox}
				<Cell checkbox>
					<Checkbox />
				</Cell>
			{/if}

			{#each headers as header}
				<Cell>{header.name}</Cell>
			{/each}
		</Row>
	</Head>

	<Body>
		{#each tableDataSource.content as item}
			<Row>
				{#if showCheckbox}
					<Cell checkbox>
						<Checkbox bind:group={selected} value={item} valueKey={item} on:change{getValues}/>
					</Cell>
				{/if}

				{#each columns as column}
					<Cell>
						{tableColumns.setTableColumns(item, column)}
					</Cell>
				{/each}
			</Row>
		{/each}
	</Body>

	<Pagination slot="paginate">
		<svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={10} on:click={() => eventChange(10)}>10</Option>
				<Option value={25} on:click={() => eventChange(25)}>25</Option>
				<Option value={100} on:click={() => eventChange(100)}>100</Option>
			</Select>
		</svelte:fragment>

		<svelte:fragment slot="total">
			{start + 1}-{end} of {tableDataSource?.totalElements}
		</svelte:fragment>

		<IconButton
			class="material-icons"
			action="first-page"
			title="First page"
			on:click={() => paginate('first')}
			disabled={tableDataSource?.first}>first_page</IconButton
		>

		<IconButton
			class="material-icons"
			action="prev-page"
			title="Prev page"
			on:click={() => paginate('prev')}
			disabled={tableDataSource?.first}>chevron_left</IconButton
		>

		<IconButton
			class="material-icons"
			action="next-page"
			title="Next page"
			on:click={() => paginate('next')}
			disabled={tableDataSource?.last}>chevron_right</IconButton
		>

		<IconButton
			class="material-icons"
			action="last-page"
			title="Last page"
			on:click={() => paginate('last')}
			disabled={tableDataSource?.last}>last_page</IconButton
		>
	</Pagination>
</DataTable>
