<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import { createEventDispatcher } from 'svelte';
	import { formValues } from '../stores/form';
	import type { FormFields } from 'src/models/form';
	import type { Content } from 'src/models/content.type';

	export let fields: FormFields[];
	let value: string;
	let disabled = true;

	const dispatch = createEventDispatcher();
	const submit = () => dispatch('submit');

	let save = () => {
		const formObject = toObject(fields);
		formValues.set(formObject);
		submit();
	};

	const toObject = (fields: FormFields[]): Object => {
		const formObject = fields.reduce(
			(o, key) => ({
				...o,
				[key.name]: key.isSelect ? getSelectedValue(value) : key.value
			}),
			{}
		);

		return !isEmpty(formObject) ? formObject : null;
	};

	const isEmpty = (formObject: Object): boolean => {
		let empty = false;

		Object.values(formObject).filter((key) => {
			if (
				key === undefined ||
				key === null ||
				key === '' ||
				key === 0 ||
				(typeof key === 'object' && key?.length === 0)
			)
				empty = true;
		});

		return empty;
	};

	const getSelectedValue = (value: string): Content => {
		let selectedObect: Content;

		fields.forEach((field: FormFields) => {
			if (field.isSelect)
				selectedObect = field.data.filter((item: Content) => item.name === value)[0];
		});

		return selectedObect;
	};

	const disableButton = () => {
		const form = toObject(fields);
		disabled = !form ? true : false;
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
					on:change={disableButton}
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
		<Button on:click={save} variant="unelevated" {disabled}>
			<Label>Register</Label>
		</Button>
	</Cell>
</LayoutGrid>
