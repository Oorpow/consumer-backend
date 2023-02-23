<template>
	<div>
		<div>
			<div class="search">
				<el-date-picker
					v-model="timeRange"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
				<div class="right-block">
					<el-input />
					<el-button type="primary" style="margin-left: 10px"
						>搜索</el-button
					>
				</div>
			</div>
		</div>
		<custom-table :tableData="tableData" :columnList="columnList">
			<template #operation="{ rowData }">
				<el-button size="mini" @click="handleEdit(rowData)">编辑</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(rowData)">删除</el-button>
			</template>
		</custom-table>
	</div>
</template>

<script>
import CustomTable from '@/components/CustomTable/CustomTable.vue'

export default {
	name: 'Consumer',
	components: {
		CustomTable,
	},
	data() {
		return {
			timeRange: [
				new Date(2000, 10, 10, 10, 10),
				new Date(2000, 10, 11, 10, 10),
			],
			tableData: [
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
			],
			columnList: [
				{ column: 'date', label: '日期' },
				{ column: 'name', label: '姓名' },
				{ column: 'address', label: '地址' },
			],
		}
	},
	methods: {
		handleEdit(row) {
			console.log(row)
		}
	}
}
</script>

<style lang="less" scoped>
.search {
	display: flex;
	justify-content: space-between;
	.right-block {
		display: flex;
	}
}
</style>
