<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import { createEventDispatcher } from 'svelte';
	import { formValues } from '../stores/form';

	export let fields;
	let value;

	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');

	let save = () => {
		const formObject = toObject(fields);
		formValues.set(formObject);
		submit();
	};

	const toObject = (fields) => {
		const obj = fields.reduce( (o, key) => ({ ...o, [key.name]: key.isSelect ? getSelectedValue(value) : key.value }),{});

		if (!isEmpty(obj)) return obj;
	};

	const isEmpty = (obj) => {
		let notEmpty = false;

		Object.values(obj).filter((key) => {
			if (key === undefined || key === null || key === '') {
				notEmpty = true;
			}
		});

		return notEmpty;
	};

	const getSelectedValue = (value: string) => {
		let selectedObect = {};

		fields.forEach((field) => {
			if (field.isSelect) selectedObect = field.data.filter((item) => item.name === value)[0];
		});

		return selectedObect;
	};
</script>

<LayoutGrid fixedColumnWidth>
	{#each fields as field}

		{#if !field.isSelect}
			<Cell span={5}>
				<Textfield
					bind:value={field.value}
					label={field.label}
					style="min-width: 100%;"
					type={field.type}
				/>
			</Cell>
		{/if}

		{#if field.isSelect}
			<Cell span={5}>
				<Select bind:value label={field.label}>
					{#each field.data as data}
						<Option value={data.name}>{data.name}</Option>
					{/each}
				</Select>
			</Cell>
		{/if}

	{/each}
</LayoutGrid>

<LayoutGrid fixedColumnWidth>
	<Cell>
		<Button on:click={save} variant="unelevated">
			<Label>Register</Label>
		</Button>
	</Cell>
</LayoutGrid>
