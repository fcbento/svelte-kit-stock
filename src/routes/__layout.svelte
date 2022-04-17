<script>
	import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<LayoutGrid fixedColumnWidth>
	<Cell span={12}>
		<main>
			<slot />
		</main>
	</Cell>
</LayoutGrid>
