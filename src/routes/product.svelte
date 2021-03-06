<script lang="ts">
	import Table from '../components/table.svelte';
	import { fetchProducts, products, create, remove } from '../stores/products';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import { ProductColumns, ProductHeaders, ProductFormBuilder } from '../models/products';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';
	import { categories } from '../stores/category';
	import Form from '../components/form.svelte';
	import { formValues } from '../stores/form';
	import { selectedValues } from '../stores/table';
	import Button, { Label } from '@smui/button';
	import Badge from '@smui-extra/badge';

	const headers: TableHeader[] = ProductHeaders;
	const columns: TableColumn[] = ProductColumns;
	const categoryStore: TableData = $categories;

	let pagination: Pagination;
	let productsList = false;
	let addProduct = false;
	let error = false;

	let formFields = ProductFormBuilder(categoryStore.content);

	const fetchProductsPaginated = () => {
		fetchProducts(pagination.rowsPerPage, pagination.page);
	};

	const registerProduct = () => {
		create($formValues);
		fetchProducts();
	};

	const removeProduct = () => {
		remove($selectedValues);
	}
</script>

<div class="accordion-container">
	<Accordion>
		<Panel bind:open={productsList}>
			<Header>
				Products List
				<span slot="description"> Total: {$products.totalElements}</span>
				<IconButton slot="icon" toggle pressed={productsList}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>

			<Content>
				<Table
					{headers}
					{columns}
					tableDataSource={$products}
					showCheckbox={true}
					bind:value={pagination}
					on:submit={fetchProductsPaginated}
				/>
				{#if $selectedValues.length > 0}
					<Button style="position: relative; margin-top: 10px;" on:click={removeProduct}>
						<Label>Remove</Label>
						<Badge aria-label="new messages count">{$selectedValues.length }</Badge>
				  	</Button>
				{/if}
			</Content>
		</Panel>

		<Panel bind:open={addProduct}>
			<Header>
				Add Product
				<IconButton slot="icon" toggle pressed={addProduct}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>

			<Content>
				<Form on:submit={registerProduct} bind:fields={formFields} />
			</Content>
		</Panel>
	</Accordion>
</div>

{#if error}
	<h1>something went wrong</h1>
{/if}
