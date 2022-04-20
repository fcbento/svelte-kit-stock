<script lang="ts">
	import Table from '../components/table.svelte';
	import { fetchProducts, products } from '../stores/products';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import { ProductColumns, ProductHeaders } from '../models/products/product-table';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';
	import { categories } from '../stores/category';
	import Form from '../components/form.svelte';
	import {formValues} from '../stores/form';

	const headers: TableHeader[] = ProductHeaders;
	const columns: TableColumn[] = ProductColumns;
	const productsStore: TableData = $products;
	const categoryStore: TableData = $categories;

	let pagination: Pagination;
	let productsList = false;
	let addProduct = false;
	let error = false;

	let formFields = [
		{
			name: 'name',
			label: 'Name',
			type: 'text',
			value: ''
		},
		{
			name: 'category',
			label: 'Category',
			isSelect: true,
			data: categoryStore.content,
			value: ''
		},
		{
			name: 'quantity',
			label: 'Quantity',
			type: 'number',
			value: ''
		},
		{
			name: 'image',
			label: 'Image',
			type: 'text',
			value: ''
		},
		{
			name: 'price',
			label: 'Price',
			type: 'number',
			value: ''
		}
	];

	const fetchProductsPaginated = () => {
		fetchProducts(pagination.rowsPerPage, pagination.page);
	};

	const registerProduct = () => {
		if($formValues === 'error') {
			error = true;
		}else{
			error = false;
		}
	};
</script>

<div class="accordion-container">
	<Accordion>
		<Panel bind:open={productsList}>
			<Header>
				Products List
				<span slot="description"> Total: {productsStore.totalElements}</span>
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
