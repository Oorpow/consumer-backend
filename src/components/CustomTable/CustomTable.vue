<template>
	<el-table :data="tableData" stripe style="width: 100%">
		<template v-for="(col, i) in columnList">
			<el-table-column :prop="col.column" :label="col.label" :key="i" />
		</template>
		<!-- 操作栏 -->
		<template v-if="showOperationColumn">
			<el-table-column label="操作">
				<!-- 插槽的默认内容 -->
				<template slot-scope="scope">
					<slot name="operation" :rowData="scope.row">
						<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</slot>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>

<script>
export default {
	name: 'CustomTable',
	props: {
		tableData: {
			type: Array,
			default: () => [],
			required: true,
		},
		columnList: {
			type: Array,
			default: () => [],
			required: true,
		},
		showOperationColumn: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {}
	},
}
</script>

<style></style>
