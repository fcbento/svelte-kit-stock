<script lang="ts">
	import Table from '../components/table.svelte';
	import { fetchProducts, products } from '../stores/products';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import { ProductColumns, ProductHeaders } from '../models/products/product-table';
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, { Label } from '@smui/button';
	import type { Pagination, TableColumn, TableData, TableHeader } from 'src/models/table';
	import type { Product } from 'src/models/products/products';
	import { categories } from '../stores/category';
	import type { Category } from 'src/models/category/category';

	const headers: TableHeader[] = ProductHeaders;
	const columns: TableColumn[] = ProductColumns;
	const productsStore: TableData = $products;
	const categoryStore: TableData = $categories;

	let pagination: Pagination;
	let productsList = false;
	let addProduct = false;
	let value: Category;

	let formFields: Product = {
		name: '',
		category: {
			categoryId: 0,
			createdAt: new Date(),
			name: ''
		},
		image: '',
		price: null,
		quantity: null
	};

	
	const fetchProductsPaginated = () => {
		fetchProducts(pagination.rowsPerPage, pagination.page);
	};

	const registerProduct = () => {
		const category = categoryStore.content.filter(item => item.name === value)[0];
		formFields.category = category;
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
				<LayoutGrid fixedColumnWidth>
					<Cell span={5}>
						<Textfield bind:value={formFields.name} label="Name" style="min-width: 100%;" />
					</Cell>

					<Cell span={5}>
						<Select bind:value label="Select Menu">
							{#each categoryStore.content as category}
								<Option value={category.name}>{category.name}</Option>
							{/each}
						</Select>
					</Cell>
				</LayoutGrid>

				<LayoutGrid fixedColumnWidth>
					<Cell span={5}>
						<Textfield bind:value={formFields.image} label="Image URL" style="min-width: 100%;" />
					</Cell>

					<Cell span={5}>
						<Textfield bind:value={formFields.price} label="Price" style="min-width: 100%;" type="number"/>
					</Cell>
				</LayoutGrid>

				<LayoutGrid fixedColumnWidth>
					<Cell span={5}>
						<Textfield bind:value={formFields.quantity} label="Quantity" style="min-width: 100%;" type="number"/>
					</Cell>
				</LayoutGrid>

				<LayoutGrid fixedColumnWidth>
					<Cell>
						<Button on:click={registerProduct} variant="unelevated">
							<Label>Register</Label>
						</Button>
					</Cell>
				</LayoutGrid>
			</Content>
		</Panel>
	</Accordion>
</div>
