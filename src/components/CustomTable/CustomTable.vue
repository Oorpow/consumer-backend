<template>
	<el-table :data="tableData" height="200" stripe style="width: 100%">
		<el-table-column v-for="(item, i) in propList" :key="i" v-bind="item">
			<template #default="scope">
				<slot :name="item.slotName" :rowData="scope.row">{{
					scope.row[item.prop]
				}}</slot>
			</template>
		</el-table-column>
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
		showOperationColumn: {
			type: Boolean,
			default: false,
		},
		propList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {}
	},
}
</script>

<style></style>
